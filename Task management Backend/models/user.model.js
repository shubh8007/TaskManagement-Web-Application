const db = require("./task.model");
const bcrypt = require("bcryptjs");

// Constructor
const User = function(user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
};

// Create a new user
User.create = async (newUser, result) => {
  // Hash password
  newUser.password = bcrypt.hashSync(newUser.password, 8);
  
  try {
    const [rows] = await db.query("INSERT INTO users SET ?", newUser);
    console.log("Created user: ", { id: rows.insertId, ...newUser });
    result(null, { id: rows.insertId, ...newUser });
  } catch (err) {
    console.error("Error creating user: ", err);
    result(err, null);
  }
};

// Find a user by username
User.findByUsername = async (username) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", username);
    if (rows.length) {
      return rows[0];
    }
    return null;
  } catch (err) {
    console.error("Error finding user by username: ", err);
    return null;
  }
};

// Check if password matches
User.checkPassword = (password, user) => {
  return bcrypt.compareSync(password, user.password);
};

module.exports = User;
