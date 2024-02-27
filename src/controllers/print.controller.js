const crudController = require("../core/crud.controller");
const printRepo = require("../services/repo/print.repo");

const printController = crudController(printRepo);

module.exports = printController;
