// @ts-check

const config = require("../config");
const controllers = require("./controllers");
const server = require("./core/server");
const { static } = require("express");
const createLoggerSimple = require("./lib/logger");
const lang = require("./core/lang");

const logger = createLoggerSimple("App");

server.use(static("public"));
server.get("/lang", (_req, res) => res.json(lang));
server.use("/api", controllers);
server.use((_req, res) => {
    res.sendFile("index.html", { root: "./public" });
});

server.listen(config.port, () => {
    logger.info("Filament-Server listen on", config.port, config.domain);
});
