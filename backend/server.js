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
    const now = moment();
    const startOfLastWeek = now.clone().subtract(1, 'weeks').startOf('week').format('YYYYMMDD');
    const startOfLastMonth = now.clone().subtract(1, 'months').startOf('month').format('YYYYMMDD');
    const startOfYearToDate = now.clone().startOf('year').format('YYYYMMDD');
    const currentDate = now.format('YYYYMMDD');

    const { SelectedFilters } = req.body;
    const query = {};

    // Filter by regions
    if (SelectedFilters.regions && SelectedFilters.regions.length > 0) {
      query.Region = { $in: SelectedFilters.regions.map(region => region.name) };
    }

    // Filter by client names
    if (SelectedFilters.clientNames && SelectedFilters.clientNames.length > 0) {
      query.Name = { $in: SelectedFilters.clientNames.map(client => client.name) };
    }

    // Filter by machine types
    let customerIdsWithMatchingMachines = [];
    if (SelectedFilters.machineTypes && SelectedFilters.machineTypes.length > 0) {
      const machineTypes = SelectedFilters.machineTypes.map(type => type.name);
      const matchingMachines = await machinesCollection.find({ TypeName: { $in: machineTypes } }).toArray();
      const matchingMachineIds = matchingMachines.map(machine => machine._id);

      const customersCollection = db.collection('customers');
      const customersWithMatchingMachines = await customersCollection.find({ 'Machines': { $in: matchingMachineIds } }).toArray();
      customerIdsWithMatchingMachines = customersWithMatchingMachines.map(customer => customer._id);
      query._id = { $in: customerIdsWithMatchingMachines };
    }

    // Date filtering
    let dateQuery = {};
    if (SelectedFilters.timeFilter && SelectedFilters.timeFilter.length > 0) {
      const timeFilterName = SelectedFilters.timeFilter[0].name;
      if (timeFilterName === "Last Week") {
        dateQuery = { $gte: startOfLastWeek, $lte: currentDate };
      } else if (timeFilterName === "Last Month") {
        dateQuery = { $gte: startOfLastMonth, $lte: currentDate };
      } else if (timeFilterName === "Year to Date") {
        dateQuery = { $gte: startOfYearToDate, $lte: currentDate };
      }
    }

    // Fetch customers
    const customers = await db.collection('customers').find(query).toArray();
    const allMachineSerialNumbers = [...new Set(customers.flatMap(customer => customer.Machines))];

    // Fetch machine performances
    const machinePerformancesCollection = db.collection('machineperformances');
    const machinePerformances = await machinePerformancesCollection.find({
      SerialNumber: { $in: allMachineSerialNumbers },
      DateInt: dateQuery
    }).toArray();

    // Create performance data map
    const performanceDataMap = {};
    machinePerformances.forEach(performance => {
      performanceDataMap[performance.SerialNumber] = performance;
      performanceDataMap[performance.SerialNumber]['handlingTime'] = (((performance.Printing_Hours) * 60 - (performance.Error_Time_In_State_Minutes) -
        (performance.Maintenance_Time_In_State_Minutes) - ((performance.Loading_Time) / 3600)) / 60);
    });

    // Calculate the average handling time
    const totalHandlingTime = machinePerformances.reduce((sum, performance) => {
      return sum + Math.abs(((performance.Printing_Hours) * 60 - (performance.Error_Time_In_State_Minutes) -
        (performance.Maintenance_Time_In_State_Minutes)) / 60);
    }, 0);
    const averageHandlingTime = totalHandlingTime / machinePerformances.length;
    console.log("The average handling time is:", averageHandlingTime);

    // Map results to include machine performance data
    const result = customers.map(customer => ({
      ...customer,
      Machines: customer.Machines.map(serialNumber => ({
        SerialNumber: serialNumber,
        Performance: performanceDataMap[serialNumber] || {},
        HandlingTime: performanceDataMap[serialNumber]?.handlingTime || 0
      }))
    }));

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
