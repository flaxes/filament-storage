const { Router } = require("express");
const errorHandlerMiddleware = require("../middlewares/error-handler.middleware");
const brandController = require("./brand.controller");
const filamentMaterialController = require("./filament-material.controller");
const filamentSettingsController = require("./filament-settings.controller");
const filamentController = require("./filament.controller");
const printHistroyController = require("./print-history.controller");

const controllers = Router();

controllers.use("/brand", brandController);
controllers.use("/filament-settings", filamentSettingsController);
controllers.use("/filament-material", filamentMaterialController);
controllers.use("/filament", filamentController);
controllers.use("/print-history", printHistroyController);

controllers.use(errorHandlerMiddleware);

module.exports = controllers;
