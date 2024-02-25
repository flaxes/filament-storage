const crudController = require("../core/crud.controller");
const printHistoryRepo = require("../services/repo/print-history.repo");

const printController = crudController(printHistoryRepo);

module.exports = printController;