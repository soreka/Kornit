const express = require('express');
const connectDB = require('./config/db');
const notificationRoutes = require('./routes/notificationRoutes');
const bodyParser = require('body-parser');

const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(bodyParser.json());

// Define Routes
app.use('/api/notifications', notificationRoutes);

module.exports = app;
