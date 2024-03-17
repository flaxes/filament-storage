const authService = require("../services/auth.service");

/**
 * @type {import("express").RequestHandler}
 */
module.exports = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        res.status(403).end();
        return;
    }

    const userData = await authService.getUserDataByToken(token, req.realIp);

    if (userData) {
        req.user = userData;
        return next();
    }

    res.status(401).end();
};
