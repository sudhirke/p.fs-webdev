const { Router } = require("express");
const router = Router();
const User = require("../models/user");

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

//Handle user sign up route
router.post("/signup", async (req, res) => {
  //extract details from request body
  const { fullName, email, password } = req.body;

  await User.create({
    fullName,
    email,
    password,
  });

  return res.redirect("/");
});

//handle user sign in
router.post("/signin", async (req, res) => {
  //extract details from request body
  const { email, password } = req.body;

  //call virual methond use await to complete DB operations
  try {
    const user = await User.matchPassword(email, password);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/users/signin");
  }
});

module.exports = router;
