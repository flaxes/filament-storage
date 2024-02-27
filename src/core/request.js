const { version } = require("../../package.json");
const Got = require("got-cjs").default.extend({
    headers: { "user-agent": `github/flaxes/filament-storage.${version}` },
});

module.exports = Got;
