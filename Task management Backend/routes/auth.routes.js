module.exports = app => {
    const auth = require("../controllers/auth.controller");
  
    var router = require("express").Router();
  
    // Register a new user
    router.post("/register", auth.register);
  
    // User login
    router.post("/login", auth.login);
  
    app.use('/api/auth', router);
  };
  