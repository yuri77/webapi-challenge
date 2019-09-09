const express = require("express");

const projectsRouter = require("../projects/projects-router.js");
const actionsRouter = require("../actions/actions-router.js");

const server = express();

server.use(express.json());
server.use("/projects", projectsRouter);
server.use("/actions", actionsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
