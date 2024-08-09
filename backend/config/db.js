const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectDB = async () => {
    try {
        await client.connect();
        console.log('MongoDB connected');
        return client.db(dbName);
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
    }
};

module.exports = connectDB;
