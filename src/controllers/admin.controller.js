const { Router } = require("express");
const Got = require("../core/request");
const { execSync } = require("child_process");
const { updateManifest, updateBranch } = require("../../config");
const { version } = require("../../package.json");
const createLoggerSimple = require("../lib/logger");
const Git = require("simple-git").default;
const adminController = Router();

const git = Git(".");
const logger = createLoggerSimple("Admin");

adminController.get("/version", async (_req, res) => {
    const package = await Got.get(updateManifest, { resolveBodyOnly: true, responseType: "json" });

    res.json({ current: version, last: package.version });
});

adminController.post("/version-update", async (req, res) => {
    const result = await git.pull("origin", updateBranch);
    const npmIResult = execSync("npm i").toString("utf-8");

    logger.warn("Version-Update", result, npmIResult);

    res.json(result);

    process.exit(0);
});

module.exports = adminController;
