const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb://localhost:27017/auth";

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = { connect };
