const mockHelper = require("../core/mock-helper");
const brandsMock = require("./brands.mock");
const materialsMock = require("./filament-materials.mock");

const mocks = [brandsMock, materialsMock];

const createMocks = async () => {
    for (const mock of mocks) {
        const result = await mockHelper(mock.repo, mock.data);

        console.log(mock.repo.table, result.length, "created");
    }

    console.log("done");
};

module.exports = createMocks;
