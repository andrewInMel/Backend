const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const genPassword = require("../encryption/passwordEncrypt").genPassword;
const passport = require("passport");

/* sign in */
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send("Authtication succeed");
});

/* sign up*/
router.post("/register", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  /* generate password hash */
  const { hash, salt } = genPassword(password);
  /* create a new user & store it in database */
  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    hash: hash,
    salt: salt,
  });
  newUser.save();
  res.send("user created");
});

module.exports = router;
