const filamentMaterialRepo = require("../services/repo/filament-material.repo");

/** @type {FilamentMaterialEntity[]} */
const data = [
    {
        name: "PLA",
    },

    {
        name: "PETG",
    },

    {
        name: "TPU",
    },

    {
        name: "SILK",
    },

    {
        name: "ABS",
    },
];

/** @type {import("../../types/mock").MockData<FilamentMaterialEntity>} */
module.exports = { data, repo: filamentMaterialRepo };
