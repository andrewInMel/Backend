const mongoose = require("mongoose");
const connection = require("../config/databaseConfig");

/* task schema */
const taskSchema = mongoose.Schema({
  taskName: {
    type: String,
    require: [true],
  },
  priority: String,
  Status: String,
  members: [Number],
});

/* export model */
module.exports = connection.model("Task", taskSchema);
