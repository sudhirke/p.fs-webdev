const jwt = require("jsonwebtoken");
const secret = "64bc468c-6783-4747-a8ce-e375adce971a";
//Set session with user mapping
function setUser(user) {
  //store the payload as jwt tocken
  return jwt.sign(
    { _id: user._id, email: user.email, username: user.username },
    secret,
  );
}

//Get user with specific session
function getUser(token) {
  if (!token) return null;
  //verify and read JWT token using secret
  return jwt.verify(token, secret);
}

module.exports = { setUser, getUser };
