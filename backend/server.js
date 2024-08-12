const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth');
const dashboardRoutes = require('./dashboard');
const filtersRoutes = require('./filters');
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
    if (SelectedFilters.timeFilter) {
      const timeFilterName = SelectedFilters.timeFilter;
      switch (timeFilterName) {
        case "LastWeek":
          dateQuery = { $gte: startOfLastWeek, $lt: startOfThisWeek };
          break;
        case "LastMonth":
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

    // Calculate total handling time and total impressions
    const totalHandlingTime = machinePerformances.reduce((sum, performance) => {
      const handlingTime = Math.abs(((performance.Printing_Hours) * 60 - (performance.Error_Time_In_State_Minutes) -
        (performance.Maintenance_Time_In_State_Minutes)) / 60);
      return sum + handlingTime;
    }, 0);

    const averageHandlingTime = totalHandlingTime / machinePerformances.length;
    
    const totalImpressions = machinePerformances.reduce((sum, performance) => {
      return sum + Number(performance.Impressions);
    }, 0);

    // Prepare the response object
    const result = {
      handlingTime: averageHandlingTime,
      totalImpressions: totalImpressions,
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

