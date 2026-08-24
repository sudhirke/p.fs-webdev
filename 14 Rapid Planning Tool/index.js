require("dotenv").config();
const express = require("express");
const app = express();
const planRouter = require("./routes/plan.route");

const PORT = process.env.PORT || 8000;

const Plan = require("./models/plan.model");

//MODDULES
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //to receive details from form body

//ROUTERS
//plan routes
app.use("/api/plan", planRouter);

//ROUTES
app.get("/", (req, res) => {
  res.send("Rapid Planning Tool ");
});

//Database Connection
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Database Connected!");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Failed to connect to database. ${err}`);
  });
