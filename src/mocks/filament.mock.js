const filamentRepo = require("../services/repo/filaments.repo");

/** @type {FilamentEntity[]} */
const data = [
    {
        brand: "DevilDesign",
        color: "#ff0000",
        colorName: "red",
        material: "PLA",
        type: "Basic",
        quantity: 1,
        name: "",
    },
    {
        brand: "3DPlast",
        color: "#0000ff",
        colorName: "blue",
        material: "PLA",
        type: "Basic",
        quantity: 1,
        name: "",
    },
    {
        brand: "3DPlast",
        color: "#ffffff",
        colorName: "Transperant",
        material: "PLA",
        type: "Transperant",
        quantity: 1,
        name: "",
    },
];

/** @type {import("../../types/mock").MockData<FilamentEntity>} */
module.exports = { data, repo: filamentRepo };
