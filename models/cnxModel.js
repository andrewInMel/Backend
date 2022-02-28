const mongoose = require("mongoose");
const db = require("../config/databaseConfig");

/* user schema */
const cnxSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: [true],
  },
  lastName: String,
  email: String,
  userId: {
    type: String,
    require: [true],
  },
  phoneNumber: String,
  address: String,
  company: String,
  occupation: String,
  birthday: String,
  vip: Boolean,
  imageSrc: String,
  notes: [{ note: String, date: String }],
  tags: [String],
  github: String,
  instagram: String,
  linkedIn: String,
  twitter: String,
});

/* export model */
module.exports = db.model("Connection", cnxSchema);
