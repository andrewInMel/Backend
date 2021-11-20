const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");

/* get user data */
router.get("/api/users/:id", (req, res) => {
  res.send("req.params");
});

module.exports = router;
