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
    const token = await User.matchPasswordAndGenerateToken(email, password);
    //console.log(token);
    //create a cookie with token and redirect to home page
    return res.cookie("token", token).redirect("/");
  } catch (err) {
    console.log(err);
    res.render("signin", { error: "Incorrect email of password." });
  }
});

//handle logout
router.get("/logout", (req, res) => {
  //clear the cookie and redirect to hom
  res.clearCookie("token").redirect("/");
});

module.exports = router;
