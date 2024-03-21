const printRepo = require("../services/repo/prints.repo");

/** @type {PrintEntity[]} */
const data = [
    {
        name: "Calibration cube",
        originLink: "https://www.printables.com/model/32539-xyz-10mm-calibration-cube",
        status: "new",
        cost: 1000,
        weightGramms: 50,
        photoUrls: ["1.webp", "2.webp"],
        previewFile: "1.webp",
        projectUploadFile: "cube.3mf",
    },

    {
        name: "Rubberband Submarine",
        originLink: "https://www.printables.com/model/767909-rubberband-submarine-print-in-place",
        status: "bad",

        photoUrls: ["1.webp", "2.webp"],

        cost: 1000,
    },

    {
        name: "Test",
        status: "waiting",
    },
];

/** @type {import("../../types/mock").MockData<PrintEntity>} */
module.exports = { data, repo: printRepo };
