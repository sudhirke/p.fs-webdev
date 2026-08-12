const path = require("path");
const express = require("express");
const config = require("./config.json");
const userRoute = require("./routes/user");
//connect mongodb
const mongoose = require("mongoose");
mongoose
  .connect(config.DB_CONN_STRING)
  .then((e) => console.log("Database Connected!!!"));

//initialize
const app = express();
const PORT = config.PORT || 8000;

//middleware
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//render home page
app.get("/", (req, res) => {
  res.render("home");
});

//register user route
app.use("/user", userRoute);

//start the server
app.listen(PORT, () => {
  console.log(`Server started in http://localhost:${PORT}`);
});
