const express = require('express');
const router = express.Router();



const fetchFilteredDataFromDB = (filters) => {
    //need ro implement db connection 
  return {
    chartData: [{ x: 'Jan', y: 10 }, { x: 'Feb', y: 20 }],
    statisticsData: { total: 30 }
  };
};

router.post('/filtered-data', (req, res) => {
  const filters = req.body;
  const filteredData = fetchFilteredDataFromDB(filters);
  res.json(filteredData);
});

module.exports = router;
