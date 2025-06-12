require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require("./config/db");
const cookieParser = require('cookie-parser');
// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = ["https://auth-suoj.vercel.app/"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Database connection
db.connect();

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
