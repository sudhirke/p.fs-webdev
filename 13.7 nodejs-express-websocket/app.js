require("dotenv").config();
const express = require("express");
const http = require("http"); //Note http is required in this case
const { Server } = require("socket.io"); //1. Require Server from socket.io
const path = require("path");

const app = express();
const server = http.createServer(app); //create http server
const io = new Server(server); //2. Pass the http server to create Server object from socket.io

//read port from  environment
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.static(path.resolve("./public"))); //to render static contents from public

//Routes
app.get("/", (req, res) => {
  return res.sendFile("./public/index.html");
});

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("A user has connected", socket.id);

  // Handle new messages
  socket.on("chat message", (msg) => {
    console.log("Message received:", msg);
    // Broadcast the message to all connected clients
    io.emit("chat message", msg);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

//Start the express server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
