const authService = require("../services/auth.service");

/**
 * @type {import("express").RequestHandler}
 */
module.exports = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        const fileToken = req.query._;

        if (fileToken && req.originalUrl.startsWith("/api/uploads/get/")) {
            const isValidToken = fileToken && (await authService.isFileTokenValid(fileToken));

            if (isValidToken) {
                next();
            } else {
                res.status(403).end();
            }

            return;
        }

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
