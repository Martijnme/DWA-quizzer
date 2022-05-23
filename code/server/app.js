"use strict";
const express = require("express");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const ws = require("ws");
const onWSConnection = require("./websockets/websockets");

const theExpressApp = express();
const theHttpServer = http.createServer();
const webSocketServer = new ws.Server({
  server: theHttpServer,
  clientTracking: true,
});

theExpressApp.use(cors({ origin: true, credentials: true }));
theExpressApp.options("*", cors({ origin: true, credentials: true }));

const port = 3000;
const dbName = "quizzer";
const mongoose = require("mongoose");

const teamsRoute = require("./routes/teams");
const questionsRoute = require("./routes/questions");
const gamesRoute = require("./routes/games");

theExpressApp.use(bodyParser.json());
theExpressApp.use(
  expressSession({
    resave: false,
    saveUninitialized: true,
    secret: "hamkaascorsant",
  })
);

theExpressApp.use("/teams", teamsRoute);
theExpressApp.use("/questions", questionsRoute);
theExpressApp.use("/games", gamesRoute);

theExpressApp.use(function (err, req, res, next) {
  res.status(500).send(err.message);
  next(err);
});

webSocketServer.on("connection", function connection(websocket) {
  onWSConnection(websocket, webSocketServer);
});

theHttpServer.on("request", theExpressApp);
theHttpServer.listen(port, async function () {
  await mongoose.connect(
    `mongodb://localhost:27017/${dbName}`,
    { useNewUrlParser: true },
    () => {
      console.log(`game server started on port ${port}`);
    }
  );
});
