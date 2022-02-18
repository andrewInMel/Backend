const express = require("express");
const Task = require("../models/taskModel");
const router = express.Router();
const isAuthenticated = require("./authMiddleware").isAuthenticated;

/* delete a task */
router.delete("/:taskId", isAuthenticated, async (req, res) => {
  const taskId = req.params.taskId;
  const deletedTask = await Task.findByIdAndDelete(taskId);
  if (deletedTask) {
    res.send("Task deleted");
  } else {
    res.send("Task deletion failed");
  }
});

/* get all tasks of an user */
router.get("/", isAuthenticated, (req, res) => {
  const userId = req.query.userId;
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
  Task.findById(req.params.taskId)
    .then((task) => {
      res.send(task);
    })
    .catch((err) => {
      console.log(err);
      res.send("something went wrong, please try later");
    });
});

/* create a new task */
router.post("/create", isAuthenticated, async (req, res) => {
  const userId = req.body.userId;
  const taskName = req.body.taskName;
  const priority = req.body.priority;
  const status = req.body.status;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const description = req.body.description;
  const members = req.body.members;
  /* create a new task  */
  const newTask = new Task({
    userId: userId,
    taskName: taskName,
    priority: priority,
    status: status,
    startDate: startDate,
    endDate: endDate,
    description: description,
    members: members,
  });
  await newTask.save();
  res.send("New task created");
});

/* update the detail of a single task */
router.post("/update", isAuthenticated, (req, res) => {
  const taskId = req.body.taskId;
  const taskName = req.body.taskName;
  const priority = req.body.priority;
  const status = req.body.status;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const description = req.body.description;
  const members = req.body.members;
  /* update a task  */
  Task.updateOne(
    { _id: taskId },
    {
      taskName: taskName,
      priority: priority,
      status: status,
      startDate: startDate,
      endDate: endDate,
      description: description,
      members: members,
    }
  )
    .then((counts) => {
      if (counts.matchedCount === 0) {
        res.send("Task does not exist");
      } else {
        if (counts.modifiedCount === 0) {
          res.send(
            "Task's detail updates failed, It may be because of the new detail is the same as the existing detail"
          );
        } else {
          res.send("Task updated");
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
