const express = require("express");
const router = express.Router();

/* get user data */
router.get("/:id", (req, res) => {
  res.send("req.params");
});

module.exports = router;
