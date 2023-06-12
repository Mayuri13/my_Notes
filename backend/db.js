const mongoose = require('mongoose');
require('dotenv/config')
// const mongoURI = "mongodb://127.0.0.1:27017/my_notes";

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

module.exports = connectToMongo;
