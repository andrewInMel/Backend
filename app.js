/**
 * part of the session & JWT authentication is inspired or credit to <Zach Gollwitzer>,
 * his github address is: https://github.com/zachgoll
 */

const express = require("express");
const cors = require("cors");
/* routes */
const userRoutes = require("./api_routes/userRoutes.js");
const cnxRoutes = require("./api_routes/cnxRoutes.js");
const taskRoutes = require("./api_routes/taskRoutes.js");

/* enviroment variable, access by process.env.Variable_Name */
const aaa = require("dotenv").config();

/* express application */
const app = express();
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
app.use("/api/user", userRoutes);
app.use("/api/connections", cnxRoutes);
app.use("/api/tasks", taskRoutes);

/* litsen on port process.env.PORT || 5000 */
app.listen(process.env.PORT || 5000);
