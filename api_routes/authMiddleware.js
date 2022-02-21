/* verify if a cookie contains a valid user */
module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json("Authentication failed");
  }
};

/* authenticate user routes */
module.exports.userAuthenticated = (req, res, next) => {
  if (
    req.isAuthenticated() &&
    req.session.passport.user === req.params.userId
  ) {
    next();
  } else {
    res.status(401).json("Authentication failed");
  }
};
