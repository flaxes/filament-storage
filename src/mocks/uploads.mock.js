const uploadRepo = require("../services/repo/upload.repo");

/** @type {UploadEntity[]} */
const data = [
    {
        fileName: '1.webp',
        mimetype: 'image/webp',
        sizeMb: 1,
        isPhoto: true
    },

    {
        fileName: '2.webp',
        mimetype: 'image/webp',
        sizeMb: 1.2,
        isPhoto: true
    },

    {
        fileName: 'ball.3mf',
        mimetype: 'model/3mf',
        sizeMb: 2,
        isPhoto: false
    },
];

/** @type {import("../../types/mock").MockData<UploadEntity>} */
module.exports = { data, repo: uploadRepo };
