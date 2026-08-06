//require to load environnent file values
const { loadEnvFile } = require("node:process");
loadEnvFile();

const express = require("express");
const fs = require("fs");
const app = express();
const mongoose = require("mongoose"); //require to load mongoose module

//1. Define Schema for users collection
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: String,
    job_title: String,
  },
  { timestamps: true },
); // Add timestamps option to automatically add createdAt and updatedAt fields

//2. Create a model for the users collection using the schema
const User = mongoose.model("User", userSchema);

//3. Connect to MongoDB Atlas using the connection string from the .env file
const uri = process.env.MONGODB_CONNECTION_STRING;
mongoose
  .connect(uri)
  .then(() => {
    console.log("SUCCESS: Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("ERROR: Unable to connect to MongoDB Atlas:", err);
  });

app.use(express.urlencoded({ extended: false }));
const PORT = 8000;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log(
    "Middleware-01 - Request received at " + new Date().toISOString(),
  );
  next();
});

// For browsers return formatted HTML when the /users endpoint is accessed. -->
app.get("/users", async (req, res) => {
  const allUsers = await User.find({});
  const html = `<ul>${allUsers.map((user) => `<li>${user.first_name} ${user.last_name} - ${user.email}</li>`).join("")}</ul>`;
  res.send(html);
});

// This is a simple Express server that listens on port 8000 and responds with "Hello, World!" when the root URL is accessed. -->
// Users as a JSON response when the /api/users endpoint is accessed. -->
app.get("/api/users", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//Combine different requests for the same endpoint using app.route() method
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    //read user from MonboDB Atlas using Mongoose
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  })
  .patch(express.json(), async (req, res) => {
    const { first_name, last_name, email, gender, job_title } = req.body;
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    //Update user in MongoDB Atlas using Mongoose
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  })
  .delete(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  });

// POST Route to create a new user
app.post("/api/users", express.json(), (req, res) => {
  const { first_name, last_name, email, gender, job_title } = req.body;
  if (!first_name || !last_name || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newUser = {
    first_name,
    last_name,
    email,
    gender,
    job_title,
  };
  // Insert to MongoDB Atlas using Mongoose
  const user = new User(newUser);
  user
    .save()
    .then(() => {
      console.log(
        `User ${newUser.first_name} ${newUser.last_name} saved successfully`,
      );
    })
    .catch((err) => {
      console.error("ERROR: Failed to save user:", err);
    });

  return res.status(201).json({
    msg: `User ${newUser.first_name} ${newUser.last_name} saved successfully`,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api/users`);
});
