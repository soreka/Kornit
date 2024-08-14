const express = require("express");
const router = express.Router();
const { default: mongoose } = require('mongoose');
const moment = require('moment'); // Ensure moment is required

router.get("/dashboard-surveys", (req, res) => {
  console.log('i am in rout service');
  res.json({
    success: true,
    data: {
      dataType: "Surveys Response Rate",
      percentageAnswered: "35%",
      title1: "Non-Responders",
      title2: "Questions",
      subDataTitle:"Total sent surveys",
      subDataValue:"2300",
      surveys: {
        cfi: {
          array1: [
            {
              answeredPercentage: "58%",
              question: "How satisfied are you with the installation process?",
              answer: "Very satisfied"
            },
            {
              answeredPercentage: "73%",
              question: "Was the installation completed on time?",
              answer: "Yes, it was on time"
            },
            {
              answeredPercentage: "82%",
              question: "How would you rate the professionalism of the installers?",
              answer: "Excellent"
            },
            {
              answeredPercentage: "65%",
              question: "Were all your questions answered during the installation?",
              answer: "Yes, all questions were answered"
            },
            {
              answeredPercentage: "91%",
              question: "Would you recommend our installation service?",
              answer: "Definitely"
            }
          ],
          array2: [
            "John Doe",
            "Jane Smith",
            "Alice Johnson"
          ]
        },
        service_calls: {
          array1: [
            {
              answeredPercentage: "88%",
              question: "How quickly was your service call answered?",
              answer: "Within 10 minutes"
            },
            {
              answeredPercentage: "77%",
              question: "Was the issue resolved on the first visit?",
              answer: "Yes, it was"
            },
            {
              answeredPercentage: "93%",
              question: "How would you rate the technician's knowledge?",
              answer: "Very knowledgeable"
            },
            {
              answeredPercentage: "84%",
              question: "Did the technician explain the issue and solution clearly?",
              answer: "Yes, very clearly"
            },
            {
              answeredPercentage: "90%",
              question: "How satisfied are you with the overall service?",
              answer: "Highly satisfied"
            }
          ],
          array2: [
            "Bob Brown",
            "Charlie Davis",
            "Diana Evans"
          ]
        },
        maintainence: {
          array1: [
            {
              answeredPercentage: "75%",
              question: "How often is routine maintenance performed?",
              answer: "Every 6 months"
            },
            {
              answeredPercentage: "83%",
              question: "Is the maintenance schedule convenient?",
              answer: "Yes, it's convenient"
            },
            {
              answeredPercentage: "67%",
              question: "Were any issues found during the last maintenance?",
              answer: "No issues found"
            },
            {
              answeredPercentage: "92%",
              question: "How would you rate the thoroughness of the maintenance?",
              answer: "Very thorough"
            },
            {
              answeredPercentage: "89%",
              question: "Would you recommend our maintenance service?",
              answer: "Yes, I would"
            }
          ],
          array2: [
            "Frank Green",
            "George Harris",
            "Helen White"
          ]
        },
        machinetype_post_installation: {
          array1: [
            {
              answeredPercentage: "85%",
              question: "Was the machine properly installed and tested?",
              answer: "Yes, it was"
            },
            {
              answeredPercentage: "90%",
              question: "Are you satisfied with the machine's performance?",
              answer: "Yes, very satisfied"
            },
            {
              answeredPercentage: "80%",
              question: "Did the installer provide adequate training?",
              answer: "Yes, training was adequate"
            },
            {
              answeredPercentage: "74%",
              question: "Have you experienced any issues since installation?",
              answer: "No issues so far"
            },
            {
              answeredPercentage: "93%",
              question: "Would you recommend this machine to others?",
              answer: "Yes, definitely"
            }
          ],
          array2: [
            "Ivy Lee",
            "Jack Miller",
            "Karen Wilson"
          ]
        }
      }
    }
  });
});
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

module.exports = router;
