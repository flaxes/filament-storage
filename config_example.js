module.exports = {
    port: 5000,
    allowedIp: "127.0.0",
    repoPath: "./storage",
    uploadsPath: "./uploads",

    lang: "en",
    serverLocale: "en-us",

    // Git
    updateFrom: "https://github.com/flaxes/filament-storage",
    updateBranch: "master",
    // Checks "version" property
    updateManifest: "https://raw.githubusercontent.com/flaxes/filament-storage/master/package.json",

    DEBUG: true,
};
