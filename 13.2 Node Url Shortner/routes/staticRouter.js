const URL = require("../models/url"); //Import the URL model
const router = require("express").Router(); //Create a new router instance
const {
  handleStaticRoutes,
  handleSignUp,
} = require("../controllers/staticRouter");
const { handleUserLogin } = require("../controllers/user");

//Render home page for static
router.get("/", handleStaticRoutes);
router.get("/signup", handleSignUp);
router.get("/login", (req, res) => {
  return res.render("login");
});

//export the router
module.exports = router;
