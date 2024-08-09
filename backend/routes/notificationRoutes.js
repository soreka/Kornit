const express = require('express');
const { sendNotification } = require('../controllers/notificationController');

const router = express.Router();

router.post('/', sendNotification);

module.exports = router;
