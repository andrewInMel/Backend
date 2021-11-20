const express = require("express");
const passport = require("passport");
const router = express.Router();

/* get task list */
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("auth passed");
  } else {
    res.send("auth did not pass");
  }
});

module.exports = router;
