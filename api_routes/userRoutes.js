const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const genPassword = require("../encryption/passwordEncrypt").genPassword;

/* user sign in */
router.post("/login", (req, res) => {
  res.send("Authtication succeed");
});

/* user register */
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

/* get user data */
router.get("/api/users/:id", (req, res) => {
  res.send("req.params");
});

module.exports = router;
