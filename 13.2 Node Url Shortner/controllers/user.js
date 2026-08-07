const User = require("../models/users");

async function handleUserSignup(req, res) {
  //extract data from request body
  const { username, email, password } = req.body;
  await User.create({ username, email, password });

  //render the home page with a success message
  return res.render("home", {
    status: "success",
    message: "User created successfully",
  });
}

module.exports = {
  handleUserSignup,
};
