module.exports = (maxTries, cooldownMs) => {
    let counters = {};

    setInterval(() => (counters = {}), cooldownMs);

    return (req, res, next) => {
        if (counters[req.realIp] >= maxTries) {
            return res.status(429).end("");
        }

        counters[req.realIp] = (counters[req.realIp] || 0) + 1;

        return next();
    };
};
