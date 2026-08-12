const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");

//define user schema
const userSchema = new Schema(
  {
    fullName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    salt: { type: String, require: true },
    password: { type: String, require: true },
    profileImage: { type: String, default: "/images/avatar.jpg" },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  },
  { timestamps: true },
);

//middleware to encrypt password
userSchema.pre("save", async function (next) {
  const user = this;

  // 'this' refers to the current document being saved
  if (!this.isModified("password")) return;

  //create a randomBytes salt and hash the password
  const salt = randomBytes(16).toString();
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  //update user with values
  this.salt = salt;
  this.password = hashPassword;

  next();
});

//create a user model
const User = model("user", userSchema);

//export the User Model
module.exports = User;
