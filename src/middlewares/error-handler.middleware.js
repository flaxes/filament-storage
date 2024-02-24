const { DEBUG } = require("../../config");
const { HttpError } = require("../core/http-errors");
const logger = require("../lib/logger")("ErrorHandle");

/** @type {import('express').ErrorRequestHandler} */
module.exports = (err, req, res, _next) => {
    if (err.isJoi) {
        const { message } = err.details[0];
        let reqData = `Ip: ${req.realIp} path: ${req.method} ${req.url}`;

        const { body } = req;
        if (body) {
            const token = body.Token || body.token || body.secret || body.secretkey;
            if (typeof token === "string") {
                const part = ~~(token.length / 2);
                reqData += ` Token: ${token.slice(0, part)}${"*".repeat(part)}`;
            }
        }

        logger.debug(reqData, message);

        res.status(400).json({ message, title: "VALIDATION_ERROR" });
        return;
    }

    if (err instanceof HttpError) {
        res.status(err.code).json({ message: err.message, errors: err.errors });
        return;
    }

    const error = { message: "INTERNAL_ERROR" };
    if (DEBUG) {
        error.stack = typeof err.stack === "string" ? err.stack.split("\n") : err.message;
    }

    logger.error(err.stack || err);

    res.status(500).json(error);
};
