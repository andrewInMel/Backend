const mongoose = require("mongoose");
const connection = require("../config/databaseConfig");

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
  hash: {
    type: String,
    require: [true],
  },
  salt: {
    type: String,
    require: [true],
  },
});

const User = connection.model("User", userSchema);
/* export model */
module.exports = User;
