const { nanoid } = require("nanoid");
const URL = require("../models/url");

//create a short URL on post request
async function handleGenerateShortUrl(req, res) {
  try {
    //console.log("Request body:", req.body); // Log the request body for debugging
    const body = req.body;
    const url = body.url; // Extract the URL from the request body

    // Validate that body contains the url property
    if (!url) {
      return res.status(400).json({ error: "ERROR: URL is required" });
    }

    // Generate a short URL (you can implement your own logic here)
    const shortId = nanoid(8); // Generate a unique 8-character ID
    await URL.create({
      shortId: shortId,
      redirectUrl: url,
      shortUrl: `http://localhost:8001/url/${shortId}`,
      visitHistory: [],
    });

    const shortUrl = `http://localhost:8001/url/${shortId}`;

    // Return the short URL in the response
    res.status(201).json({ shortUrl });
  } catch (error) {
    console.error(
      "handleGenerateShortUrl - Error generating short URL:",
      error,
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//handle redirect to original URL on get request
async function handleGetRedirectUrls(req, res) {
  try {
    const shortId = req.params.shortId; // Extract the shortId from the request parameters

    // Find the URL document in the database based on the shortId
    const urlDoc = await URL.findOne({ shortId });

    if (!urlDoc) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Update the visit history with the current timestamp
    urlDoc.visitHistory.push({ timestamp: new Date() });
    await urlDoc.save();

    // Redirect to the original URL
    res.redirect(urlDoc.redirectUrl);
  } catch (error) {
    console.error(
      "handleGetRedirectUrls - Error retrieving redirect URL:",
      error,
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//Get Analytics Handler
async function handleGetAnalytics(req, res) {
  try {
    const shortId = req.params.shortId; // Extract the shortId from the request parameters

    // Find the URL document in the database based on the shortId
    const urlDoc = await URL.findOne({ shortId });

    if (!urlDoc) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Return the visit history as analytics data
    res.status(200).json({
      totalVisits: urlDoc.visitHistory.length,
      visitHistory: urlDoc.visitHistory,
    });
  } catch (error) {
    console.error(
      "handleGetAnalytics - Error retrieving analytics data:",
      error,
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//Export the module
module.exports = {
  handleGenerateShortUrl,
  handleGetRedirectUrls,
  handleGetAnalytics,
};
