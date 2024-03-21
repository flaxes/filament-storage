/**
 *
 * Create filaments.txt containing next structure:
 *
 *
 * Brand
 * Material Color Type Quantity Gramms ColorHex NoExport
 *
 * Exmaple:
 *
 * DevilDesign
 * PETG White Basic 1 900 #FFFFFF 0
 * PETG Black Basic 1 900 #000000 1
 *
 * 3DPlast
 * PLA White Basic 1 900 #FFFFFF 0
 * PLA Black Basic 1 900 #000000 1
 *
 *
 *
 */

const fs = require("fs");
const filamentsRepo = require("../src/services/repo/filaments.repo");
const FILE = "./filaments.txt";
const file = fs.readFileSync(FILE, { encoding: "utf-8" });
const INSERT = true;

const lines = file.replace(/\r/g, "").split("\n");

let currentBrand = "";

/** @type {FilamentEntity[]} */
const filaments = [];

for (const line of lines) {
    if (!line) {
        currentBrand = "";
        continue;
    }

    if (!currentBrand) {
        currentBrand = line.trim();
        continue;
    }

    const parts = line.split(" ");
    console.log(parts);
    const [material, colorName, type, quantity, gramms, color, isNoExport] = parts;

    filaments.push({
        brand: currentBrand,
        color,
        colorName,
        material,
        type,
        isNoExport: isNoExport === "1",
        quantity: Number(quantity) || 0,
        weightGramms: Number(gramms) || 0,
    });
}

console.log(filaments);

if (INSERT) {
    filamentsRepo.create(filaments).catch(err => console.log(err));
}
