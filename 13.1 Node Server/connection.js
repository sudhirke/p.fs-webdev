const mongoose = require("mongoose");
mongoose.set("strictQuery", true); // Set strictQuery to true to enforce strict mode for queries

async function connectToMongoDB(url) {
  return mongoose.connect(url);
  console.log("SUCCESS: Connected to MongoDB Atlas");
}

module.exports = { connectToMongoDB };
