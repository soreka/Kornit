const express = require('express');
const router = express.Router();


router.get('/filters', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: 'Filter 1' },
      { id: 2, name: 'Filter 2' },
      { id: 3, name: 'Filter 3' },
    ],
  });
});

router.post('/apply-filter', (req, res) => {
  const filter = req.body.filter;
  res.json({
    success: true,
    data: `Data filtered by ${filter.name}`,
  });
});

module.exports = router;
