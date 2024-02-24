const crudController = require("../core/crud.controller");
const filamentRepo = require("../services/repo/filament.repo");

const filamentController = crudController(filamentRepo);

module.exports = filamentController;
