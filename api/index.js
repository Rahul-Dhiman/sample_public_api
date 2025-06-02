const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/calculate-net-price', (req, res) => {
  const { lines } = req.body;
  
  // Input validation
  if (!lines || !Array.isArray(lines)) {
    return res.status(400).json({
      success: false,
      message: 'Lines array is required',
      expectedInput: {
        lines: [
          {
            lineId: "string",
            listPrice: "number",
            Quantity: "number"
          }
        ]
      }
    });
  }
  
  // Validate each line item
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.lineId || typeof line.listPrice !== 'number' || typeof line.Quantity !== 'number') {
      return res.status(400).json({
        success: false,
        message: `Invalid data in line ${i + 1}. Each line must have lineId, listPrice (number), and Quantity (number)`,
        invalidLine: line
      });
    }
  }
  
  // Calculate NetUnitPrice for each line
  const processedLines = lines.map(line => {
    const netUnitPrice = line.listPrice * line.Quantity;
    return {
      lineId: line.lineId,
      NetUnitPrice: netUnitPrice * 10
    };
  });
  
  // Return the output in the exact format you specified
  res.json({
    lines: processedLines
  });
});

// GET API - Root endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'Server is running successfully',
  });
});

// Export the Express API for Vercel
module.exports = app;
