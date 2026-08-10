const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  //Get authorization header values
  const tokenValue = req.cookies?.token;
  req.user = null; //reset the user to null

  //check for token
  if (!tokenValue) return next(); //all good,  call next middleware

  const token = tokenValue; //extract the token value
  const user = getUser(token);
  req.user = user;
  next();
}

//Implement Role Based Security
function restrictTo(roles = []) {
  return function (req, res, next) {
    //check if user is valid and user role is allowed to access the page
    if (!req.user) {
      console.log(`AUTH: Unable to find user.`);
      return res.redirect("/login");
    }

    //check if user role is included in the allowed roles list
    if (!roles.includes(req.user.role))
      return res.end(
        `${req.user.email} is un-authorized to access this content!`,
      );

    //if all good go to next middleware
    next();
  };
}

/* Commented:  This work is done using the function above 
async function restrictToLoggedInUserOnly(req, res, next) {
  //Check if cookie contains the uid
  const userUid = req.cookies?.uid;

  //redirect to login page
  if (!userUid) return res.redirect("/login");

  //Check if user found
  const user = getUser(userUid);
  if (!user) return res.redirect("/login");

  //console.log(`MW-Auth: Found user ${user}`);

  //if all is okay pass the request to next in the middlewaire chain
  req.user = user;
  next();
} */

module.exports = { restrictTo, checkForAuthentication };
