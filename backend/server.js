const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/buddies', require('./routes/buddies'));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Study Buddy API Running!',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend build and add SPA fallback(for direct reloads / deep links)
const buildPath = path.join(__dirname, '..', 'frontend', 'build');
const fs = require('fs');
if(fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    if(req.originalUrl.startsWith('/api/')) {
      return res.status(404).json({ error: "Not Found" });
    }
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));