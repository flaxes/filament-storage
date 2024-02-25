const filamentRepo = require("../services/repo/filament.repo");

/** @type {PrintEntity[]} */
const data = [
    {
        name: "Calibration cube",
        printedTimes: 1,
        projectLink:
            "https://files.printables.com/media/prints/32539/stls/319002_e8ef6ded-289d-497b-ac65-8bbbfb04c33a/xyz-10mm-calibration-cube.stl",
        originLink: "https://www.printables.com/model/32539-xyz-10mm-calibration-cube",
        history: [
            {
                cost: 750,
                filamentSettingIds: [1, 2],
                weight: 0.23,
                photoUploadsIds: [1, 2],
                projectUploadsIds: [1, 2],
            },
        ],
    },

    {
        name: "Rubberband Submarine",
        printedTimes: 0,
        originLink: "https://www.printables.com/model/767909-rubberband-submarine-print-in-place",
        history: [],
    },

    {
        name: "Test",
        printedTimes: 0,
        history: [],
    },
];

/** @type {import("../../types/mock").MockData<PrintEntity>} */
module.exports = { data, repo: filamentRepo };
