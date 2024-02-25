const crudController = require("../core/crud.controller");
const printHistoryRepo = require("../services/repo/print-history.repo");

const printHistoryController = crudController(printHistoryRepo);

module.exports = printHistoryController;
