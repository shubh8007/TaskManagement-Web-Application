const db = require("../models/task.model");

// Create and save a new task
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Title can not be empty!" });
    return;
  }

  // Create a task
  const task = {
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed ? req.body.completed : false
  };

  try {
    const result = await db.query("INSERT INTO tasks SET ?", task);
    console.log("Created task: ", { id: result[0].insertId, ...task });
    res.send({ id: result[0].insertId, ...task });
  } catch (err) {
    console.error("Error creating task: ", err);
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Task."
    });
  }
};

// Retrieve all tasks from the database
exports.findAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tasks");
    console.log("Fetched all tasks");
    res.send(rows);
  } catch (err) {
    console.error("Error fetching tasks: ", err);
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tasks."
    });
  }
};

// Find a single task with an id
exports.findOne = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", req.params.taskId);
    if (rows.length) {
      console.log("Found task: ", rows[0]);
      res.send(rows[0]);
    } else {
      res.status(404).send({
        message: `Not found Task with id ${req.params.taskId}.`
      });
    }
  } catch (err) {
    console.error("Error fetching task: ", err);
    res.status(500).send({
      message: "Error retrieving Task with id " + req.params.taskId
    });
  }
};

// Update a task by the id in the request
exports.update = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Title can not be empty!"
    });
    return;
  }

  const task = {
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed ? req.body.completed : false
  };

  try {
    const result = await db.query("UPDATE tasks SET ? WHERE id = ?", [task, req.params.taskId]);
    if (result[0].affectedRows === 0) {
      res.status(404).send({
        message: `Not found Task with id ${req.params.taskId}.`
      });
    } else {
      console.log("Updated task: ", { id: req.params.taskId, ...task });
      res.send({ id: req.params.taskId, ...task });
    }
  } catch (err) {
    console.error("Error updating task: ", err);
    res.status(500).send({
      message: "Error updating Task with id " + req.params.taskId
    });
  }
};

// Delete a task with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const result = await db.query("DELETE FROM tasks WHERE id = ?", req.params.taskId);
    if (result[0].affectedRows === 0) {
      res.status(404).send({
        message: `Not found Task with id ${req.params.taskId}.`
      });
    } else {
      console.log("Deleted task with id: ", req.params.taskId);
      res.send({ message: "Task was deleted successfully!" });
    }
  } catch (err) {
    console.error("Error deleting task: ", err);
    res.status(500).send({
      message: "Could not delete Task with id " + req.params.taskId
    });
  }
};
