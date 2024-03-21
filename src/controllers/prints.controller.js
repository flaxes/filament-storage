const crudController = require("../core/crud.controller");
const printRepo = require("../services/repo/prints.repo");

const printsController = crudController(printRepo);

module.exports = printsController;
