const mongoose = require("mongoose");

//1. Define Schema for users collection
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: String,
    job_title: String,
  },
  { timestamps: true },
); // Add timestamps option to automatically add createdAt and updatedAt fields

//2. Create a model for the users collection using the schema
const User = mongoose.model("User", userSchema);

//3. Export the User model to be used in other parts of the application
module.exports = User;
