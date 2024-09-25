// const mongoose=require('mongoose')
// mongoose.connect().
// 56vKwEm3OF02HCGx
// mongodb+srv://kundanmaurya:56vKwEm3OF02HCGx@cluster0.wuiy3.mongodb.net/
// config/db.js

// config/db.js

const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async () => {

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
