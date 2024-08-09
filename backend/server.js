/*const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 5000;


const mongoURL = process.env.MONGO_URI;

const mongoDB = new MongoClient(mongoURL);

mongoDB.connect();

const db = mongoDB.db('kornit-dev');


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/
const express = require('express');
const connectDB = require('./config/db');
const notificationRoutes = require('./routes/notificationRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/notifications', notificationRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
