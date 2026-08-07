const express = require("express");
const {
  handleGenerateShortUrl,
  handleGetRedirectUrls,
  handleGetAnalytics,
  handleListAllShortUrls,
} = require("../controllers/url");

//create a express router
const router = express.Router();

//ROUTES
router.get("/analytics/:shortId", handleGetAnalytics);
router.get("/:shortId", handleGetRedirectUrls);
router.post("/", handleGenerateShortUrl).get("/", handleListAllShortUrls);

//Export the router
module.exports = router;
