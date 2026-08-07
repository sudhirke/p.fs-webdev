const URL = require("../models/url"); //Import the URL model
async function handleStaticRoutes(req, res) {
  const allUrls = await URL.find({});
  return res.render("home", { shortUrls: allUrls });
}

async function handleSignUp(req, res) {
  return res.render("signup");
}

module.exports = { handleStaticRoutes, handleSignUp };
