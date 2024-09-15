const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected to database successfully");
  } catch (error) {
    console.log("failed to connect to database");
  }
};

module.exports = connectToMongo;
