// @ts-check

const { default: helmet } = require("helmet");
const security = require("./middlewares/security.middleware");
const express = require("express");

const server = express();

server.use(helmet());
server.use(security);

module.exports = server;
