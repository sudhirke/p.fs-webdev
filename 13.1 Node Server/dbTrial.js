const mongoose = require("mongoose");
//require to load environnent file values
const { loadEnvFile } = require("node:process");
loadEnvFile();

//get connection string from .env file
const uri = process.env.MONGODB_CONNECTION_STRING;

//Call function to connect to MongoDB Atlas and get all users from the "users" collection in the "test" database and log the result to the console.
main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(uri);
    const db = mongoose.connection;
    db.on(
      "error",
      console.error.bind(console, "FAILED: MongoDB connection error:"),
    );
    db.once("open", () => {
      console.log("SUCCESS: Connected to MongoDB Atlas");
    });

    //Create users schema
    const userSchema = new mongoose.Schema({
      first_name: String,
      last_name: String,
      email: String,
      gender: String,
      job_title: String,
    });

    //Create users model
    const User = mongoose.model("User", userSchema);

    //Get all users from the "users" collection in the "test" database and log the result to the console.
    const users = await User.find({});
    users.map((user) => {
      console.log(
        `User: ${user.first_name} ${user.last_name}, Email: ${user.email}, Gender: ${user.gender}, Job Title: ${user.job_title}`,
      );
    });
  } catch (err) {
    console.error("ERROR: Unable to connect to MongoDB Atlas:", err);
  } finally {
    await mongoose.connection.close();
  }
}
