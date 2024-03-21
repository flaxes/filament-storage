const { domain } = require("../../../config");
const createXlsx = require("../../lib/xlsx");
const filamentRepo = require("../../services/repo/filaments.repo");

module.exports = async (_req, res) => {
    /** @type {(keyof Model<FilamentEntity>)[]} */
    const columns = ["id", "material", "type", "colorName", "brand"];
    const filaments = await filamentRepo.findAll();

    const data = [];
    const createLink = (id) => `${domain}/f?id=${id}`;
    for (const filament of filaments) {
        if (filament.isNoExport) continue;

        const d = [];
        for (const column of columns) {
            d.push(filament[column] || "");
        }

        d.push(createLink(filament.id));

        data.push(d);
    }

    columns.push("qr");

    const book = createXlsx("Filaments", columns, data);

    res.header("content-type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    await book.xlsx.write(res);
};
