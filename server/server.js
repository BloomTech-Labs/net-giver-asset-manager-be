const express = require("express");
const server = express();

const cors = require("cors");
const helmet = require("helmet");

const path = require("path");
const bodyParser = require("body-parser");

const authenticate = require("../api/auth/auth-middleware");

const authRouter = require("../api/auth/auth-router.js");
const assetsRouter = require("../api/assets/assets-router.js");
const historyRouter = require("../api/history/history-router.js");
const locationRouter = require("../api/locations/location-router");
const profileRouter = require("../api/aws/profile.js");
const demoRouter = require("../api/aws/S3getRouter");
const userRouter = require('../api/users/users-router');

// server.use( bodyParser.urlencoded( { extended: false} ) );
// server.use( bodyParser.json() );
server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/api/amy", profileRouter);

server.use("/api/auth", authRouter);
server.use("/api/aws", demoRouter);

server.use("/api/assets", assetsRouter);
server.use("/api/history", historyRouter);
server.use("/api/location", locationRouter);
server.use('/api/user-images', userRouter);


server.get("/", (req, res) => {
  res.status(200).send("We are live!");
});

module.exports = server;
