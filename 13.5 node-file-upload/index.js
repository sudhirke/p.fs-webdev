//import required modules
const path = require("path");
const express = require("express");
const multer = require("multer"); //import multer

//configure multr storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage }); //Create multer object with storage configuration

//init the app
const app = express();
const PORT = 8000;

//set viewws configuration to EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//routes
app.get("/", (req, res) => {
  return res.render("homepage");
});
//handle file upload
app.post("/upload", upload.single("avatar"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.redirect("/");
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //require to parse data other then JSON

//start the server
app.listen(PORT, () => {
  console.log(`Server started in http://localhost:${PORT}`);
});
