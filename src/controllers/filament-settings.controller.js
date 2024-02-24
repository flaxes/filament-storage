const crudController = require("../core/crud.controller");
const filamentSettingsRepo = require("../services/repo/filament-settings.repo");

const filamentSettingsController = crudController(filamentSettingsRepo);

module.exports = filamentSettingsController;
