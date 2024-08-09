const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);

app.get('/api/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route.');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});