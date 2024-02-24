class HttpError extends Error {
    constructor(code, msg, errors) {
        super(msg);
        this.code = code;
        this.errors = errors;
    }
}

class BadRequestError extends HttpError {
    constructor(msg) {
        super(400, msg);
    }
}

class InternalServerError extends HttpError {
    constructor(msg) {
        super(500, msg);
    }
}

class UnauthorizedError extends HttpError {
    constructor(msg) {
        super(401, msg);
    }
}

module.exports = { HttpError, BadRequestError, InternalServerError, UnauthorizedError };
