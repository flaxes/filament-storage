const { Router } = require("express");
const authService = require("../services/auth.service");
const rateLimitMiddleware = require("../middlewares/rate-limit.middleware");

const authController = Router();

/**
 *
 * @param {any} str
 * @param {number} [length]
 * @returns {str is string}
 */
const checkString = (str, length = 50) => typeof str === "string" && str.length > 0 && str.length <= length;
const rejectRequest = (res, msg) => {
    res.status(400).json({ error: msg });
};
authController.use(rateLimitMiddleware(5 + 1e3, 600e3));

authController.post("/login", async (req, res) => {
    if (!req.body || !req.body.username || !req.body.password) {
        return rejectRequest(res, "INVALID_BODY");
    }

    const { body } = req;

    const isValid = checkString(body.username) && checkString(body.password);
    if (!isValid) return rejectRequest(res, "WRONG_PASSWORD");

    const result = await authService.loginUser({ username: body.username, password: body.password }, req.realIp);
    if (!result) {
        return res.json({ error: "NOT_FOUND" });
    }

    res.json(result);
});

authController.post("/logout", async (req, res) => {
    if (!req.body || !req.body.token) {
        return rejectRequest(res, "INVALID_BODY");
    }

    const { token } = req.body;
    if (!checkString(token, 100)) return rejectRequest(res, "WRONG_TOKEN");

    const success = await authService.logout(token);

    res.json({ success });
});

authController.post("/refresh", async (req, res) => {
    if (!req.body || !req.body.token) {
        return rejectRequest(res, "INVALID_BODY");
    }

    const { token } = req.body;
    if (!checkString(token, 100)) return rejectRequest(res, "WRONG_TOKEN");

    const result = await authService.refreshToken(token, req.realIp);
    if (!result) {
        return res.json({ error: "NOT_FOUND" });
    }

    res.json(result);
});

module.exports = authController;
