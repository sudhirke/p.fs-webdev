//require to load environnent file values
const { loadEnvFile } = require("node:process");
loadEnvFile();

const express = require("express");
const app = express();
const fs = require("fs");

const { connectToMongoDB } = require("./connection"); //require to load connectToMongoDB module
const { userRouter } = require("./routes/user"); //require to load userRouter module
const { logRequest } = require("./middleware"); //require to load logRequest module

// MIDDLEWARE Use the logRequest middleware to log all incoming requests to a file named "requests.log"
app.use(logRequest("requests.txt"));
app.use(express.urlencoded({ extended: false }));
const PORT = 8000;

//CONNECT to MonboDB using Connection module
connectToMongoDB(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("SUCCESS: Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("ERROR: Failed to connect to MongoDB Atlas", error);
  });

//ROUTES
app.use("/api/users", userRouter); //use userRouter for /api/users endpoint

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api/users`);
});
