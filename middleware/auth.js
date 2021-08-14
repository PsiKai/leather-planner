const jwt = require("jsonwebtoken");
// const config = require("config");

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: "You are not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "You have been logged out" });
  }
};