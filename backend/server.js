const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth');
const dashboardRoutes = require('./dashboard');
const filtersRoutes = require('./filters');
const notificationRoutes = require('./routes/notificationRoutes');
const cors = require('cors');
const moment = require('moment'); // Ensure moment is required
const { default: mongoose } = require('mongoose');

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();




// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', filtersRoutes);
app.use('/api/notifications', notificationRoutes);
// Protected Route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route.');
});

// POST /filter Route
app.post('/filter', async (req, res) => {
  try {
    const db = mongoose.connection.db; // Get the MongoDB connection
    const machinesCollection = db.collection('machines');
    const customersCollection = db.collection('customers');
    const machinePerformancesCollection = db.collection('machineperformances');

    const now = moment();
    const startOfLastWeek = now.clone().subtract(1, 'weeks').startOf('week').format('YYYYMMDD');
    const startOfThisWeek = now.clone().startOf('week').format('YYYYMMDD');
    const startOfLastMonth = now.clone().subtract(1, 'months').startOf('month').format('YYYYMMDD');
    const startOfThisMonth = now.clone().startOf('month').format('YYYYMMDD');
    const startOfYearToDate = now.clone().startOf('year').format('YYYYMMDD');
    const currentDate = now.format('YYYYMMDD');

    const { SelectedFilters } = req.body;
    const query = {};

    // Filter by regions
    if (SelectedFilters.regions && SelectedFilters.regions.length > 0) {
      query.Region = { $in: SelectedFilters.regions };
    }

    // Filter by client names
    if (SelectedFilters.clientNames && SelectedFilters.clientNames.length > 0) {
      query.Name = { $in: SelectedFilters.clientNames };
    }

    // Filter by machine types
    let customerIdsWithMatchingMachines = [];
    if (SelectedFilters.machineTypes && SelectedFilters.machineTypes.length > 0) {
      const matchingMachines = await machinesCollection.find({ TypeName: { $in: SelectedFilters.machineTypes } }).toArray();
      const matchingMachineIds = matchingMachines.map(machine => machine._id);

      const customersWithMatchingMachines = await customersCollection.find({ Machines: { $in: matchingMachineIds } }).toArray();
      customerIdsWithMatchingMachines = customersWithMatchingMachines.map(customer => customer._id);
      query._id = { $in: customerIdsWithMatchingMachines };
    }

    // Date filtering
    let dateQuery = {};
    let relativeComparedDateQuery = {}
    if (SelectedFilters.timeFilter) {
      const timeFilterName = SelectedFilters.timeFilter;
      switch (timeFilterName) {
        case "LastWeek":
          let startOfRelativeWeek = now.clone().subtract(2, 'weeks').startOf('week').format('YYYYMMDD');
          relativeComparedDateQuery = { $gte: startOfRelativeWeek, $lt: startOfLastWeek }
          dateQuery = { $gte: startOfLastWeek, $lt: startOfThisWeek };
          break;
        case "LastMonth":
          let startOfRelativeMonth = now.clone().subtract(2, 'months').startOf('month').format('YYYYMMDD');
          relativeComparedDateQuery = { $gte: startOfRelativeMonth, $lt: startOfLastMonth }
          dateQuery = { $gte: startOfLastMonth, $lt: startOfThisMonth };
          break;
        case "YeartoDate":
          dateQuery = { $gte: startOfYearToDate, $lte: currentDate };
          break;
        default:
          break;
      }
    }

    // Fetch customers based on filters
    const customers = await customersCollection.find(query).toArray();
    const allMachineSerialNumbers = [...new Set(customers.flatMap(customer => customer.Machines))];



    // Fetch machine performances
    const machinePerformances = await machinePerformancesCollection.find({
      SerialNumber: { $in: allMachineSerialNumbers },
      DateInt: dateQuery,
    }).toArray();

    const relativeComparedPerformances = await machinePerformancesCollection.find({
      SerialNumber: { $in: allMachineSerialNumbers },
      DateInt: relativeComparedDateQuery,
    }).toArray();

    let return_obj = {
      Maintenance_Time_In_State_Minutes: { value: 0, maxValue: -Infinity, minValue: Infinity, Title: 'Maintenance time(m)' },
      Loading_Time: { value: 0, maxValue: -Infinity, minValue: Infinity, Title: 'Loading' },
      Idle_state_duration: { value: 0, maxValue: -Infinity, minValue: Infinity, Title: 'Idle duration' },
      Error_Time_In_State_Minutes: { value: 0, maxValue: -Infinity, minValue: Infinity, Title: 'Error time' },
    };
    let totalHandlingTime = 0;
    // Calculate total handling time and update return_obj
    machinePerformances.forEach((performance) => {
      totalHandlingTime += Math.abs(((performance.Printing_Hours) * 60 - (performance.Error_Time_In_State_Minutes) -
        (performance.Maintenance_Time_In_State_Minutes)) / 60);

      return_obj.Maintenance_Time_In_State_Minutes.value += Number(performance.Maintenance_Time_In_State_Minutes);
      return_obj.Maintenance_Time_In_State_Minutes.maxValue = Math.max(return_obj.Maintenance_Time_In_State_Minutes.maxValue, Number(performance.Maintenance_Time_In_State_Minutes));
      return_obj.Maintenance_Time_In_State_Minutes.minValue = Math.min(return_obj.Maintenance_Time_In_State_Minutes.minValue, Number(performance.Maintenance_Time_In_State_Minutes));

      return_obj.Loading_Time.value += Number(performance.Loading_Time);
      return_obj.Loading_Time.maxValue = Math.max(return_obj.Loading_Time.maxValue, Number(performance.Loading_Time));
      return_obj.Loading_Time.minValue = Math.min(return_obj.Loading_Time.minValue, Number(performance.Loading_Time));

      return_obj.Idle_state_duration.value += Number(performance.Idle_state_duration);
      return_obj.Idle_state_duration.maxValue = Math.max(return_obj.Idle_state_duration.maxValue, Number(performance.Idle_state_duration));
      return_obj.Idle_state_duration.minValue = Math.min(return_obj.Idle_state_duration.minValue, Number(performance.Idle_state_duration));

      return_obj.Error_Time_In_State_Minutes.value += Number(performance.Error_Time_In_State_Minutes);
      return_obj.Error_Time_In_State_Minutes.maxValue = Math.max(return_obj.Error_Time_In_State_Minutes.maxValue, Number(performance.Error_Time_In_State_Minutes));
      return_obj.Error_Time_In_State_Minutes.minValue = Math.min(return_obj.Error_Time_In_State_Minutes.minValue, Number(performance.Error_Time_In_State_Minutes));

    });

    const averageHandlingTime = totalHandlingTime / machinePerformances.length;

    const totalImpressions = machinePerformances.reduce((sum, performance) => {
      return sum + Number(performance.Impressions);
    }, 0);

    const relativeComparedTotalImpressions = relativeComparedPerformances.reduce((sum, performance) => {
      return sum + Number(performance.Impressions)
    }, 0)
    let impressionsGrowth = (totalImpressions / relativeComparedTotalImpressions) * 100
    let handlingTimeSeconds = (totalHandlingTime * 60) / totalImpressions


    // {
    //   value: 50, maxValue: 120, minValue: 10, Title: 'Maintenance_Time_In_State_Minutes'
    // },
    // { value: 0, maxValue: 100, minValue: 0, Title: 'Loading_Time' },
    // { value: 20, maxValue: 100, minValue: 0, Title: 'Idle_state_duration' },
    // { value: 70, maxValue: 100, minValue: 0, Title: 'Error_Time_In_State_Minutes' }

    // Prepare the response object
    const result = {
      chartData: return_obj,
      handlingTimeSeconds: handlingTimeSeconds,
      utilization: averageHandlingTime,
      totalImpressions: totalImpressions,
      impressionsGrowth: impressionsGrowth,
      machinePerformances: machinePerformances,
    };

    res.status(200).json(result);

  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

