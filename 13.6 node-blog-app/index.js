const path = require("path");
const cookieParser = require("cookie-parser");
const express = require("express");
const config = require("./config.json");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
var moment = require("moment"); // require moment js

const Blog = require("./models/blog");
//connect mongodb
const mongoose = require("mongoose");
const { checkForAuthenticationCookie } = require("./middleware/authentication");
mongoose
  .connect(config.DB_CONN_STRING)
  .then((e) => console.log("Database Connected!!!"));

//initialize
const app = express();
const PORT = config.PORT || 8000;

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public"))); // consider everything under public folder as static content

//set view engines
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//render home page
app.get("/", async (req, res) => {
  //fetch blogs from database
  const blogs = await Blog.find({}).sort("createdAt");
  console.log(blogs);
  res.render("home", { user: req.user, blogs: blogs, moment });
});

//register user route
app.use("/user", userRouter);
app.use("/blog", blogRouter);

//start the server
app.listen(PORT, () => {
  console.log(`Server started in http://localhost:${PORT}`);
});
