const express = require("express");
const router = express.Router();
const passport = require("passport");
/* get task list */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.send("auth passes");
  }
);

module.exports = router;
