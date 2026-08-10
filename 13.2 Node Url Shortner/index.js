const express = require("express");
const urlRoutes = require("./routes/url"); //Import the routers
const staticRoutes = require("./routes/staticRouter");
const userRoutes = require("./routes/user"); //Import the user routes
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth"); //custom middleware to validate logged in user only content

const { connectToDatabase } = require("./connect"); //Import the database connection function
const path = require("path"); //Import the path module for handling file paths

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
app.use(express.json()); //JSON middleware to parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); //URL-encoded middleware to parse incoming URL-encoded requests
app.use(cookieParser()); //Cookie parser middleware to read cookie value
app.use(checkForAuthentication); //Check for user authentication

app.use("/", staticRoutes);
app.use("/url", restrictTo(["NORMAL"]), urlRoutes); //Route Handler for URL routes. Restict this page to "NORMAL" users only
app.set("view engine", "ejs"); //View Engine EJS
app.set("views", path.resolve("./views")); //Set the views directory for EJS templates

//User Routes
app.use("/user", userRoutes); //Route Handler for User routes

//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/url`);
});
