const { Schema, model } = require("mongoose");

//Define blog schema
//define user schema
const blogSchema = new Schema(
  {
    title: { type: String, require: true },
    body: { type: String, require: true },
    coverImage: { type: String, default: "/images/avatar.jpg" },
    createdBy: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true },
);

//create a user model
const Blog = model("blog", blogSchema);

//export the User Model
module.exports = Blog;
