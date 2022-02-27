const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
/* routes */
const authRoutes = require("./api_routes/authRoutes.js");
const cnxRoutes = require("./api_routes/cnxRoutes.js");
const taskRoutes = require("./api_routes/taskRoutes.js");
const userRoutes = require("./api_routes/userRoutes.js");

/* enviroment variable, access by process.env.Variable_Name */
require("dotenv").config();

/* express application */
const app = express();
/* bodyParser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* cors setup */
const corsOptions = {
  origin: process.env.FRONTEND,
  credentials: true,
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

/* session setup */
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_STRING,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 12,
      sameSite: "none",
      secure: true,
      httpOnly: true,
    },
  })
);

/* passport configuration */
require("./config/passportConfig");
app.use(passport.initialize());
app.use(passport.session());

/* routes */
app.use("/auth", authRoutes);
app.use("/api/connections", cnxRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

/* litsen on port process.env.PORT || 5000 */
app.listen(process.env.PORT || 5000);
