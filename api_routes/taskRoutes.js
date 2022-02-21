const express = require("express");
const Task = require("../models/taskModel");
const router = express.Router();
const isAuthenticated = require("./authMiddleware").isAuthenticated;

/* delete a task */
router.delete("/:taskId", isAuthenticated, async (req, res) => {
  const doc = await Task.findOneAndDelete({
    _id: req.params.taskId,
    userId: req.session.passport.user,
  });
  if (doc) {
    res.send("Task deleted");
  } else {
    res.send("Task does not exist");
  }
});

/* get all tasks of the authenticated user */
router.get("/", isAuthenticated, (req, res) => {
  const userId = req.session.passport.user;
  Task.find({ userId: userId }, (err, tasks) => {
    if (err) {
      console.log(err);
      res.send("something went wrong while retrieving tasks, please try later");
    } else {
      res.send(tasks);
    }
  });
});

/* get the detail of a single task */
router.get("/:taskId", isAuthenticated, (req, res) => {
  Task.findOne({
    _id: req.params.taskId,
    userId: req.session.passport.user,
  })
    .then((oneTask) => {
      res.send(oneTask);
    })
    .catch((err) => {
      console.log(err);
      res.send("something went wrong, please try later");
    });
});

/* create a new task */
router.post("/create", isAuthenticated, async (req, res) => {
  /* create a new task  */
  const newTask = new Task({
    userId: req.session.passport.user,
    taskName: req.body.taskName,
    priority: req.body.priority,
    status: req.body.status,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
    members: req.body.members,
  });
  const result = await newTask.save();
  if (result) {
    res.send("New task created");
  } else {
    res.send("something went wrong, please try later");
  }
});

/* update the detail of a single task */
router.post("/update/:taskId", isAuthenticated, async (req, res) => {
  const oneTask = await Task.findById(req.params.taskId);
  /* verify the authenticated user has permission to carry out the operation */
  if (oneTask.userId === req.session.passport.user) {
    oneTask.taskName = req.body.taskName;
    oneTask.priority = req.body.priority;
    oneTask.status = req.body.status;
    oneTask.startDate = req.body.startDate;
    oneTask.endDate = req.body.endDate;
    oneTask.description = req.body.description;
    oneTask.members = req.body.members;
    /* update document */
    const result = await oneTask.save();
    if (result) {
      res.send("Task updated");
    } else {
      res.send("something went wrong, please try later");
    }
  } else {
    res.status(401).json("Unauthorised operation or task not found");
  }
});

module.exports = router;
