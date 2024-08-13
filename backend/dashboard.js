const express = require("express");
const router = express.Router();
const { default: mongoose } = require('mongoose');
const moment = require('moment'); // Ensure moment is required

// router.post("/dashboard-data", (req, res) => {
//   res.json({
//     success: true,
//     data: {
//       message: "This is the dashboard data",
//       stats: [10, 20, 30, 40, 50, 60, 70],
//     },
//   });
// });
router.post("/dashboard-data", async (req, res) => {
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

module.exports = router;
