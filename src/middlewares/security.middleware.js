const { allowAnyLocal, geoHeader, whitelistGeo, ipHeader } = require("../../config").security;

/** @type {import('express').RequestHandler} */
module.exports = (req, res, next) => {
    if (!req.ip) return next("NO IP");

    let ip = req.headers[ipHeader] || req.ip.replace("::ffff:", "");
    if (Array.isArray(ip)) ip = ip[0];

    req.realIp = ip;

    if (allowAnyLocal) {
        if (["::1", "127.0.0.1"].includes(ip) || ip.startsWith("192.168.")) {
            return next();
        }
    }

    if (whitelistGeo && whitelistGeo.length) {
        let geo = req.headers[geoHeader] || "";

        if (Array.isArray(geo)) geo = geo[0];

        if (whitelistGeo.includes(geo)) {
            next();
        } else {
            res.status(500).end("LANG_ERROR");
        }

        return;
    }

    // ALlow anyone
    next();
};
