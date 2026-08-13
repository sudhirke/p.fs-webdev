const { Schema, model } = require("mongoose");

//Define comments schema
// > Relates to User and Blog schema

const commentSchema = new Schema(
  {
    content: { type: String, require: true },
    blogId: { type: Schema.Types.ObjectId, ref: "blog" },
    createdBy: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true },
);

//create a  model
const Comment = model("comment", commentSchema);

//export the  Model
module.exports = Comment;
