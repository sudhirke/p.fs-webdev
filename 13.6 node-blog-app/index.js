const path = require("path");
const express = require("express");
const config = require("./config.json");

//initialize
const app = express();
const PORT = config.PORT || 8000;

//middleware
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//render home page
app.get("/", (req, res) => {
  res.render("home");
});

//start the server
app.listen(PORT, () => {
  console.log(`Server started in http://localhost:${PORT}`);
});
