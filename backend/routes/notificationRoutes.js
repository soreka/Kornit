const express = require('express');
// const { sendNotification,sendNotificationToMultipleTokens, storeToken } = require('../controllers/notificationController');
const { sendNotification } = require('../controllers/notificationController');

const router = express.Router();

router.post('/', sendNotification);
// router.post('/send-notifications', sendNotificationToMultipleTokens);
// router.post('/token', storeToken);

module.exports = router;
