const express = require("express");
const urlRoutes = require("./routes/url"); //Import the routers
const { connectToDatabase } = require("./connect"); //Import the database connection function
//Load environment variables from .env file
const { loadEnvFile } = require("node:process");
// Loads environment variables from the default .env file
loadEnvFile();

const app = express();
const PORT = process.env.PORT || 8001;

//Connect to the database
connectToDatabase(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the application if the database connection fails
  });

//Middleware
app.use(express.json());
app.use("/url", urlRoutes);

//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/url`);
});
