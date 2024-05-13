module.exports = app => {
    const tasks = require("../controllers/task.controller");
  
    // Create a new task
    app.post("/api/tasks", tasks.create);
  
    // Retrieve all tasks
    app.get("/api/tasks", tasks.findAll);
  
    // Retrieve a single task with id
    app.get("/api/tasks/:taskId", tasks.findOne);
  
    // Update a task with id
    app.put("/api/tasks/:taskId", tasks.update);
  
    // Delete a task with id
    app.delete("/api/tasks/:taskId", tasks.delete);
  };
  