const express = require("express");
const cors = require("cors");
const passport = require("passport");
/* routes */
const userRoutes = require("./api_routes/userRoutes.js");
const cnxRoutes = require("./api_routes/cnxRoutes.js");
const taskRoutes = require("./api_routes/taskRoutes.js");
const authRoutes = require("./api_routes/authRoutes.js");

/* express application */
const app = express();

/* passport configuration */
require("./config/passportConfig")(passport);

/* initialize passport */
app.use(passport.initialize());

/* bodyParser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* cors setup */
const corsOptions = {
  origin: "http://localhost:3000",
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

/* routes */
app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/connections", cnxRoutes);
app.use("/api/tasks", taskRoutes);

/* litsen on port process.env.PORT || 5000 */
app.listen(process.env.PORT || 5000);
