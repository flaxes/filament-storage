const { Router } = require("express");
const errorHandlerMiddleware = require("../middlewares/error-handler.middleware");
const brandController = require("./brand.controller");
const filamentMaterialController = require("./filament-material.controller");
const filamentSettingsController = require("./filament-settings.controller");
const filamentController = require("./filament.controller");
const printHistroyController = require("./print-history.controller");

const controllers = Router();

controllers.use("/brands", brandController);
controllers.use("/filament-settings", filamentSettingsController);
controllers.use("/filament-materials", filamentMaterialController);
controllers.use("/filaments", filamentController);
controllers.use("/print-history", printHistroyController);

controllers.use(errorHandlerMiddleware);

module.exports = controllers;
