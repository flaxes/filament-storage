// @ts-check

const { default: helmet } = require("helmet");
const security = require("../middlewares/security.middleware");
const express = require("express");

const server = express();

server.use(
    helmet({
        contentSecurityPolicy: false,
        strictTransportSecurity: false,
        crossOriginOpenerPolicy: false,
        originAgentCluster: false
    })
);
server.use((req, res, next) => {
    next();
});
// server.use(security);

module.exports = server;
