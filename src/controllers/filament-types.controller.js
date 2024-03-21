const crudController = require("../core/crud.controller");
const filamentTypesRepo = require("../services/repo/filament-types.repo");

const filamentTypesController = crudController(filamentTypesRepo);

module.exports = filamentTypesController;
