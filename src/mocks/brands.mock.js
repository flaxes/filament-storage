const brandRepo = require("../services/repo/brand.repo");

/** @type {BrandEntity[]} */
const data = [
    {
        name: "DevilDesign",
    },

    {
        name: "3DPlast",
    },

    {
        name: "Kingroon",
    },

    {
        name: "Flashforge",
    },
];

/** @type {import("../../types/mock").MockData<BrandEntity>} */
module.exports = { data, repo: brandRepo };
