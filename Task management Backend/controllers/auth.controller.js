const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = require("../models/user.model");

// Register a new user
exports.register = async (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).send({ message: "Username, email, and password are required!" });
    return;
  }

  // Create a user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  // Save user in the database
  User.create(newUser, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    } else {
      res.send(data);
    }
  });
};

// User login
exports.login = async (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: "Username and password are required!" });
    return;
  }

  // Find user by username
  const user = await User.findByUsername(req.body.username);
  if (!user) {
    res.status(404).send({ message: "User not found." });
    return;
  }

  // Check password
  const passwordIsValid = User.checkPassword(req.body.password, user);
  if (!passwordIsValid) {
    res.status(401).send({ message: "Invalid password!" });
    return;
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400 // 24 hours
  });

  res.status(200).send({
    id: user.id,
    username: user.username,
    email: user.email,
    accessToken: token
  });
};
