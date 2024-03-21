const crudController = require("../core/crud.controller");
const filamentMaterialRepo = require("../services/repo/filament-materials.repo");

const filamentMaterialsController = crudController(filamentMaterialRepo);

module.exports = filamentMaterialsController;
