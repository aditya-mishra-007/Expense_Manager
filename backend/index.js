const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  // This whitelists your specific deployed frontend so the browser doesn't block requests
  origin: [
    "http://localhost:5173", 
    "https://expense-manager-frontend-3b6l.onrender.com"
  ],
  credentials: true
}));

app.use(express.json());

// Routes
// These prefixes must match what your frontend Axios/Fetch calls are hitting
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/expenses', require('./routes/expense')); 

// Redundant route to handle singular 'expense' calls if your Dashboard uses them
app.use('/api/expense', require('./routes/expense'));

// Health check (Visit https://expense-manager-final.onrender.com/ to see this)
app.get('/', (req, res) => {
  res.send('Expense Manager API is running');
});

// Dynamic Port for Render
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });