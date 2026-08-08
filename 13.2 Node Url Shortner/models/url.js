const mongoose = require("mongoose");

//1. Create Schema for URL
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true },
);

//create a Model for URL
const URL = mongoose.model("Url", urlSchema);

//Export the URL model
module.exports = URL;
