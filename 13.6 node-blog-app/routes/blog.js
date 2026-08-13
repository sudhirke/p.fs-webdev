const Blog = require("../models/blog");
const Comment = require("../models/comments");
const { Router } = require("express");
const router = Router();

//1. multer for file storage
const multer = require("multer");
const path = require("path");
//2. configure multer disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`)); //files will be uploaded in this directory
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
//3. Create Multer upload object with storage option
const upload = multer({ storage: storage });

//router for create new blog page
router.get("/addnew", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

//get route to view specific blog page
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy"); //populate the created by user
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy",
  );

  console.log(comments);
  res.render("blog", { user: req.user, blog: blog, comments });
});

//submit handler for creating new blog
router.post("/", upload.single("coverImage"), async (req, res) => {
  //console.log(req.body);
  const { title, body } = req.body; //extract form details from request
  //Create Blog in database
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImage: `/uploads/${req.file.filename}`,
  });

  //redirect to page that displays blog
  return res.redirect(`/blog/${blog._id}`);
});

//route to handle comments
router.post("/comment/:blogId", async (req, res) => {
  //Create a new comment in database and refer to blog and user
  const comment = await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });

  res.redirect(`/blog/${req.params.blogId}`);
});

//export router
module.exports = router;
