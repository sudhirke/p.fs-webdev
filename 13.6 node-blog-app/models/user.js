const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");
const {
  createTokenForUser,
  validateToken,
} = require("../services/authentication");

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

//create mongoose virtuals for password decryption
// Create a virtual property `matchPassword` that's computed from `email`.
userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
  //return this.email.slice(this.email.indexOf('@') + 1);
  const user = await this.findOne({ email });

  //Check if user found
  if (!user) {
    console.log("User not found!");
    throw new Error("User not found in the register");
  }

  //extract salt and password from database
  const salt = user.salt;
  const hashedPassword = user.password;

  //encrypt user provided password
  const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  //if password does not match throw error
  if (hashedPassword !== userProvidedHash)
    throw new Error("Incorrect password!!");

  //return user token if password matches
  //return user;
  const token = createTokenForUser(user);
  return token;
});

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

  next;
});

//create a user model
const User = model("user", userSchema);

//export the User Model
module.exports = User;
