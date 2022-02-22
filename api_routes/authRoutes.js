const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const genPassword = require("../encryption/passwordEncrypt").genPassword;
const validate = require("../encryption/passwordEncrypt").validate;
const issueJWT = require("../utility");
const passport = require("passport");
const isAuthenticated = require("./authMiddleware").isAuthenticated;

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

/* user log out */
router.get("/logout", isAuthenticated, (req, res) => {
  res.clearCookie("jwt");
  res.send("You are successfully logged out");
});

/* google login routes */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/* google api call back routes */
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
