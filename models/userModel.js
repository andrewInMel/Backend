const mongoose = require("mongoose");
const connection = require("../config/databaseConfig");

/* user schema */
const userSchema = new mongoose.Schema({
  googleId: String,
  firstName: String,
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

const User = connection.model("User", userSchema);
/* export model */
module.exports = User;
