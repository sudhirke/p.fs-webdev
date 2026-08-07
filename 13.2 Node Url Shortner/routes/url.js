const express = require("express");
const {
  handleGenerateShortUrl,
  handleGetRedirectUrls,
  handleGetAnalytics,
} = require("../controllers/url");

//create a express router
const router = express.Router();

//ROUTES
router.get("/analytics/:shortId", handleGetAnalytics);
router.get("/:shortId", handleGetRedirectUrls);
router.post("/", handleGenerateShortUrl);

//Export the router
module.exports = router;
