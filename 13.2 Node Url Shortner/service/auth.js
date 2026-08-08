const sessionToUserMap = new Map();

//Set session with user mapping
function setUser(id, user) {
  sessionToUserMap.set(id, user);
}

//Get user with specific session
function getUser(id) {
  return sessionToUserMap.get(id);
}

module.exports = { setUser, getUser };
