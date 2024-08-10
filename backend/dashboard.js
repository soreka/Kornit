const express = require('express');
const router = express.Router();


router.get('/dashboard-data', (req, res) => {
  res.json({
    success: true,
    data: {
      message: 'This is the dashboard data',
      stats: [10, 20, 30, 40], 
    },
  });
});

module.exports = router;
