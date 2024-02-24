const crudController = require("../core/crud.controller");
const printHistoryRepo = require("../services/repo/print-history.repo");

const printHistroyController = crudController(printHistoryRepo);

module.exports = printHistroyController;
