const express = require("express");
const app = express();
const PORT = process.env.PORT || 8001;

app.get("/", (req, res) => {
  res.send("Hello Node.js - Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
