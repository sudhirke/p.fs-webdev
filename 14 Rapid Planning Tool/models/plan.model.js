const mongoose = require("mongoose");

/** Define SCHEMA
  - Title - Text
  - Due Date - Date/Time
  - Purpose - Text
  - Importance (Low/Med/High) - Choice
  - Success Critera - Text
  - Context - Text
 */

const planSchema = mongoose.Schema(
  {
    title: { type: String, require: [true, "Please enter title of the plan"] },
    importance: {
      type: String,
      enum: ["low", "medium", "high"], // Allowed values
      default: "medium",
      require: true,
    },
    dueDate: { type: Date, default: Date.now },
    purpose: { type: String },
    successCriteria: { type: String },
    context: { type: String },
    comments: [{ body: String, date: { type: Date, default: Date.now } }],
  },
  { timestamps: true },
);

//DEFINE MODEL
const Plan = mongoose.model("Plan", planSchema);

//EXPORT the model
module.exports = Plan;
