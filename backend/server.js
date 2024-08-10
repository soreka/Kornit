const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth');
const dashboardRoutes = require('./dashboard');
const filtersRoutes = require('./filters');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/auth', authRoutes);



app.use('/api', dashboardRoutes);
app.use('/api', filtersRoutes);


app.get('/api/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route.');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
