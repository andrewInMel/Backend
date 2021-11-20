const express = require("express");
const router = express.Router();
const Connection = require("../models/cnxModel.js");

/* get connection list */
router.get("/", (req, res) => {
  Connection.find({ userId: req.query.userId })
    .then((user) => {
      return res.send(user);
    })
    .catch((e) => console.log(e));
});

module.exports = router;
