const filamentSettingsRepo = require("../services/repo/filament-settings.repo");

/** @type {FilamentSettingsEntity[]} */
const data = [
    {
        bedTemp: 60,
        filamentId: 2,
        initialBedTemp: 70,
        initialNozzleTemp: 230,
        nozzleTemp: 220,
        name: "test1",
        flowRatio: 0.98,
        kFactor: 0.035,
    },

    {
        bedTemp: 60,
        filamentId: 2,
        initialBedTemp: 70,
        initialNozzleTemp: 230,
        nozzleTemp: 220,
        name: "test2",
        flowRatio: 0.98,
        kFactor: 0.035,
    },

    {
        bedTemp: 60,
        filamentId: 2,
        initialBedTemp: 70,
        initialNozzleTemp: 230,
        nozzleTemp: 220,
        name: "test3",
        flowRatio: 0.98,
        kFactor: 0.035,
    },

    {
        bedTemp: 60,
        filamentId: 1,
        initialBedTemp: 70,
        initialNozzleTemp: 230,
        nozzleTemp: 220,
        name: "test1",
        flowRatio: 0.98,
        kFactor: 0.035,
    },

    {
        bedTemp: 60,
        filamentId: 1,
        initialBedTemp: 70,
        initialNozzleTemp: 230,
        nozzleTemp: 220,
        name: "test2",
        flowRatio: 0.98,
        kFactor: 0.035,
    },

    {
        bedTemp: 60,
        filamentId: 2,
        initialBedTemp: 70,
        initialNozzleTemp: 230,
        nozzleTemp: 220,
        name: "test3",
        flowRatio: 0.98,
        kFactor: 0.035,
    },
];

/** @type {import("../../types/mock").MockData<FilamentSettingsEntity>} */
module.exports = { data, repo: filamentSettingsRepo };
