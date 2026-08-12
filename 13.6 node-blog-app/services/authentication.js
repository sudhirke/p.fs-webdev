const config = require("../config.json");
const JWT = require("jsonwebtoken");

const secret = config.JWTSECRET;

//Create a JWT token based on user object
function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImage: user.profileImage,
    role: user.role,
  };

  const token = JWT.sign(payload, secret);
  return token;
}

//Validate token
function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = { createTokenForUser, validateToken };
