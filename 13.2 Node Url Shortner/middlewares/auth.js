const { getUser } = require("../service/auth");

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
}

module.exports = { restrictToLoggedInUserOnly };
