const URL = require("../models/url"); //Import the URL model

async function handleStaticRoutes(req, res) {
  const urlDocs = await URL.find({});
  // Map the documents to a simplified format for response
  const shortUrls = urlDocs.map((doc) => ({
    shortId: doc.shortId,
    redirectUrl: doc.redirectUrl,
    shortUrl: doc.shortUrl,
    totalVisits: doc.visitHistory.length,
  }));

  return res.render("home", { urls: shortUrls });
}

async function handleSignUp(req, res) {
  return res.render("signup");
}

module.exports = { handleStaticRoutes, handleSignUp };
