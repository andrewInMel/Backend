const express = require("express");
const router = express.Router();

/* get task list */
router.get("/", (req, res) => {
  res.send("auth passes");
});

module.exports = router;
