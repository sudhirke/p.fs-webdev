const User = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");
//handler for User Sign Up
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

//handler for User Login page
async function handleUserLogin(req, res) {
  //extract data from request body
  const { email, password } = req.body;

  //find user with this email
  const user = await User.findOne({ email, password });

  //REturn to login page with error
  if (!user) {
    return res.render("login", {
      error: "ERROR: Invalid Username or Password!",
    });
  }

  //Create new session id with UUID and save it to map (auth)
  //const sessionId = uuidv4();
  const token = setUser(user);

  //Set cookie in response
  res.cookie("token", token);

  //return to home page
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
