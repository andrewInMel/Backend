const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
/* routes */
const userRoutes = require("./api_routes/userRoutes.js");
const cnxRoutes = require("./api_routes/cnxRoutes.js");
const taskRoutes = require("./api_routes/taskRoutes.js");
const authRoutes = require("./api_routes/authRoutes.js");
/* read certificate, local only */
const cert = fs.readFileSync("C:/Users/xueyu/example.com.pem", "utf-8");
const key = fs.readFileSync("C:/Users/xueyu/example.com-key.pem", "utf-8");
/* express application */
const app = express();
app.use(cookieParser());
/* bodyParser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* passport configuration */
require("./config/passportConfig").jwtConfig(passport);
require("./config/passportConfig").googleConfig;

/* initialize passport */
app.use(passport.initialize());

/* cors setup */
const corsOptions = {
  origin: "https://example.com:3000",
  credentials: true,
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

/* routes */
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/connections", cnxRoutes);
app.use("/api/tasks", taskRoutes);

/* litsen on port process.env.PORT || 5000 */
//app.listen(process.env.PORT || 5000);
https.createServer({ key, cert }, app).listen(5000);
