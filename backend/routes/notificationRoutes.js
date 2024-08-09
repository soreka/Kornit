const express = require('express');
const { sendNotification } = require('../controllers/notificationController');

const router = express.Router();

router.post('/', sendNotification); // Handle POST requests at /api/notifications

module.exports = router;
