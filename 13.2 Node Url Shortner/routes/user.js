const express = require("express");
const router = express.Router();

const User = require("../models/users"); //import the User model
const { handleUserSignup } = require("../controllers/user"); //import the user controller

//ROUTES
router.post("/", handleUserSignup);

module.exports = router;
