const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/userModel");
const genPassword = require("../encryption/passwordEncrypt").genPassword;
const validate = require("../encryption/passwordEncrypt").validate;
const issueJWT = require("../utility");

/* user sign in */
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.username })
    .then((user) => {
      if (user) {
        if (validate(req.body.password, user.hash, user.salt)) {
          res.send(issueJWT(user._id));
        } else {
          res.status("401").json({ msg: "authentication failed" });
        }
      } else {
        res.status("404").json({ msg: "could not find user" });
      }
    })
    .catch((error) => console.log(error));
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
  res.status(200).json({ created: true });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  function (req, res) {
    var id = null;
    User.findOne({ googleId: req.user.id })
      .then((user) => {
        if (user) {
          const jwt = issueJWT(user._id);
          res.cookie("jwt", jwt.token, { httpOnly: true });
          res.redirect(`http://localhost:3000/Dashboard`);
        }
      })
      .catch((e) => console.log(e));
  }
);

module.exports = router;
