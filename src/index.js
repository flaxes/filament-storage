// @ts-check

const config = require("../config");
const endpointsRouter = require("./endpoints");
const server = require("./server");
const express = require("express");

server.use("/api", endpointsRouter);
server.use(express.static("./public"));

server.listen(config.port, () => {
    console.info(
        new Date().toLocaleString(),
        "Filament-Server listen on",
        config.port,
        "\n",
        `http://127.0.0.1:${config.port}`
    );
});
