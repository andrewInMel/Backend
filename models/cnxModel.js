const mongoose = require("mongoose");
const connection = require("../config/databaseConfig");

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
  Vip: String,
  description: String,
  imageSrc: String,
  notes: String,
  tags: [String],
  github: String,
  instagram: String,
  linkedIn: String,
  twitter: String,
});

/* export model */
module.exports = connection.model("Connection", cnxSchema);
