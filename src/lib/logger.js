/**
 *
 * @param {string} namespace
 * @returns {console}
 */
const createLoggerSimple = (namespace) => {
    const logger = new Proxy(console, {
        get: (console, method) => {
            const time = new Date().toLocaleString("ua-UA");

            // @ts-ignore. Convert symbol to string
            return console[method].bind(console, `${time}`, `[${namespace}]`, `[${method}]`);
        },
    });

    return logger;
};

module.exports = createLoggerSimple;
