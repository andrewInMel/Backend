const mongoose = require("mongoose");
const db = require("../config/databaseConfig");

/* user schema */
const userSchema = new mongoose.Schema({
  googleId: String,
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
  imageSrc: String,
  notes: [{ note: String, date: String }],
  email: {
    type: String,
    require: [true],
  },
  github: String,
  instagram: String,
  linkedIn: String,
  twitter: String,
  hash: String,
  salt: String,
});

const User = db.model("User", userSchema);
/* export model */
module.exports = User;
