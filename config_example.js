module.exports = {
    port: 5000,
    // 10 hours
    sessionTtlMinutes: 600,

    security: {
        whitelistGeo: ["GB"],
        ipHeader: 'x-forwarded-for',
        geoHeader: "x-geo-iso",
        allowAnyLocal: true,
    },

    repoPath: "./storage",
    uploadsPath: "./uploads",

    lang: "en",
    serverLocale: "ua-ua",

    domain: "http://127.0.0.1:5000",

    // Git
    updateBranch: "master",
    // Checks "version" property
    updateManifest: "https://raw.githubusercontent.com/flaxes/filament-storage/master/package.json",

    DEBUG: true,

    google: {
        // Will use local storage is disabled
        isEnabled: false,
        serviceAccountPath: "./google-drive-account.json",
        storageFolderId: "xxxxxxxxxxxxxxxxxxxxx",
        uploadsFolderId: "xxxxxxxxxxxxxxxxxxxxx",
    },

    //allowedIp: "192.168",
};
