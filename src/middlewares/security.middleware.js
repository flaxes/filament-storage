const config = require("../../config");

/** @type {import('express').RequestHandler} */
module.exports = (req, res, next) => {
    if (!req.ip) return next("NO IP");

    const ip = req.ip.replace("::ffff:", "");

    if (ip.startsWith(config.allowedIp)) {
        return next();
    }

    console.debug(ip, "unknown ip");
    res.status(403).end("please no");
};
