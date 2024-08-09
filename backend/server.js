const express = require('express');
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
});