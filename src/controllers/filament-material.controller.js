const crudController = require("../core/crud.controller");
const filamentMaterialRepo = require("../services/repo/filament-material.repo");

const filamentMaterialController = crudController(filamentMaterialRepo);

module.exports = filamentMaterialController;
