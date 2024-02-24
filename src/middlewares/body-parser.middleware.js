const { json, text, urlencoded } = require("express");

function bodyParserHandler(err, _req, res, next) {
    if (err.name === "PayloadTooLargeError") {
        res.status(413).json(err);
        return;
    }
    if (err.name === "SyntaxError") return next(new err.message());
    return next(err);
}
const bodyParserMiddleware = [
    json({ limit: "1MB" }),
    bodyParserHandler,
    text({ limit: "10MB" }),
    urlencoded({ extended: true }),
];
module.exports = bodyParserMiddleware;
