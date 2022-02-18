const mongoose = require("mongoose");
const db = require("../config/databaseConfig");

/* task schema */
const taskSchema = mongoose.Schema({
  userId: {
    type: String,
    require: [true],
  },
  taskName: {
    type: String,
    require: [true],
  },
  priority: String,
  status: String,
  startDate: String,
  endDate: String,
  description: String,
  members: [String],
});

/* export model */
module.exports = db.model("Task", taskSchema);
