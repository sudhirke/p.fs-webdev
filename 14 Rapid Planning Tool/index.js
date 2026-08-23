require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

//MODDULES
app.use(express.json());

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
