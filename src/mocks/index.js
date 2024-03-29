const mockHelper = require("../core/mock-helper");
const brandsMock = require("./brands.mock");
const materialsMock = require("./filament-materials.mock");
const filamentSettingsMock = require("./filament-settings.mock");
const filamentMock = require("./filament.mock");
const printsMock = require("./prints.mock");

/** @type {import("../../types/mock").MockData<any>[]} */
const mocks = [brandsMock, materialsMock, filamentMock, filamentSettingsMock, printsMock];

const createMocks = async () => {
    for (const mock of mocks) {
        const result = await mockHelper(mock.repo, mock.data);

        console.log(mock.repo.table, result.length, "created");
    }

    console.log("done");
};

module.exports = createMocks;
