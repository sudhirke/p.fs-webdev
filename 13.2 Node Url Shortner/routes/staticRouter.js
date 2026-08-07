const URL = require("../models/url"); //Import the URL model
const router = require("express").Router(); //Create a new router instance
const {
  handleStaticRoutes,
  handleSignUp,
} = require("../controllers/staticRouter");

//Render home page for static
router.get("/", handleStaticRoutes);
router.get("/signup", handleSignUp);

//export the router
module.exports = router;
