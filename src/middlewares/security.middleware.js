const config = require("../../config");

/** @type {import('express').RequestHandler} */
module.exports = (req, res, next) => {
    const ip = req.ip.replace("::ffff:", "");

    if (ip.startsWith(config.allowedIp)) {
        return next();
    }

    console.debug(ip, "unknown ip");
    res.status(403).end("please no");
};
