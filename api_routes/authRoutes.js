const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const genPassword = require("../encryption/passwordEncrypt").genPassword;
const validate = require("../encryption/passwordEncrypt").validate;
const issueJWT = require("../utility");
const passport = require("passport");

/* user sign in */
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.username })
    .then((user) => {
      if (user) {
        if (validate(req.body.password, user.hash, user.salt)) {
          res.cookie("jwt", issueJWT(user), {
            httpOnly: true,
            path: "/",
            sameSite: "None",
            secure: true,
            maxAge: 604800000,
          });
          res.send("logged in");
        } else {
          res.status("402").json({ msg: "authentication failed" });
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
    res.cookie("jwt", issueJWT(req.user), {
      httpOnly: true,
      path: "/",
      sameSite: "None",
      secure: true,
      maxAge: 604800000,
    });
    // Successful authentication, redirect home.
    res.redirect("https://example.com:3000/dashboard");
  }
);

module.exports = router;
