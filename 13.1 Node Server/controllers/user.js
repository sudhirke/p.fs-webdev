const User = require("../models/user"); //require to load User model

async function handleGetAllUsers(req, res) {
  const allUsers = await User.find({});
  return res.json(allUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  const { first_name, last_name, email, gender, job_title } = req.body;
  if (!first_name || !last_name || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json(user);
}

async function handleDeleteUserById(req, res) {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json(user);
}

async function handleCreateUser(req, res) {
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
      return res.status(420).json({
        msg: `ERROR: Failed to save user ${newUser.first_name} ${newUser.last_name} ${err.message}`,
      });
    });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUser,
};
