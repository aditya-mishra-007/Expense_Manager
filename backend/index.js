const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: '*'    // allow all origins for now
}));
app.use(express.json());

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/expense'));

// Health check
app.get('/', (req, res) => {
  res.send('Expense Manager API is running');
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));