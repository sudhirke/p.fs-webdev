const path = require("path");
const express = require("express");
//init the app
const app = express();
const PORT = 8000;

//set viewws configuration to EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.json());

//routes
app.get("/", (req, res) => {
  return res.render("homepage");
});

//start the server
app.listen(PORT, () => {
  console.log(`Server started in http://localhost:${PORT}`);
});
