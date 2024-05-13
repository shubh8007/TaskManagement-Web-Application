const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = require("../models/user.model");

// Verify JWT token
exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    req.userId = decoded.id;
    next();
  });
};
