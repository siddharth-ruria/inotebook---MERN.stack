const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected to database successfully");
  } catch (error) {
    console.log("failed to connect to database");
  }
};

module.exports = connectToMongo;
