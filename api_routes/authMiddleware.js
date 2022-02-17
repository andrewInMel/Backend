module.exports.isAuthenticated = (req, res, next) => {
  const authUser = req.session.passport.user;
  const checkedUser = req.body.userId || req.params.userId || req.query.userId;
  if (authUser != null && authUser === checkedUser) {
    next();
  } else {
    res.status(401).json("Authentication failed");
  }
};
