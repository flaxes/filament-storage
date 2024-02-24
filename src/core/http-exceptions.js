const { BadRequestError } = require("./http-errors");

const invalidRequest = new BadRequestError("INVALID_REQUEST");

module.exports = { invalidRequest };
