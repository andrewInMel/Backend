const mongoose = require("mongoose");
const db = require("../config/databaseConfig");

/* user schema */
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: [true],
  },
  lastName: String,
  phoneNumber: String,
  address: String,
  company: String,
  occupation: String,
  birthday: String,
  description: String,
  imageSrc: String,
  notes: [String],
  email: {
    type: String,
    require: [true],
  },
  hash: String,
  salt: String,
});

const User = db.model("User", userSchema);
/* export model */
module.exports = User;
