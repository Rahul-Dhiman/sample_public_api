const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET API - Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Express Server on Vercel!',
    status: 'Server is running successfully',
    timestamp: new Date().toISOString()
  });
});

// Export the Express API for Vercel
module.exports = app;
