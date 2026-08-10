const mongoose = require("mongoose"); //1. Load Mongoose Library

//2. Define schema for User model
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      default: "NORMAL",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

//3. Create a model from schema
const User = mongoose.model("User", userSchema);

//4. Export the Model
module.exports = User;
