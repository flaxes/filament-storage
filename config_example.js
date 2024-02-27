module.exports = {
    port: 5000,
    allowedIp: "127.0.0",
    repoPath: "./storage",
    uploadsPath: "./uploads",

    lang: "en",
    serverLocale: "en-us",

    domain: "http://127.0.0.1:5000",

    // Git
    updateBranch: "master",
    // Checks "version" property
    updateManifest: "https://raw.githubusercontent.com/flaxes/filament-storage/master/package.json",

    DEBUG: true,
};
