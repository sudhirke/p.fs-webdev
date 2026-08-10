const URL = require("../models/url"); //Import the URL model

async function handleStaticRoutes(req, res) {
  let urlDoc = null;
  //for admin users pull all the documents
  if (req.user.role == "ADMIN") {
    urlDocs = await URL.find({});
  } else {
    urlDocs = await URL.find({ createdBy: req.user._id });
  }

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
