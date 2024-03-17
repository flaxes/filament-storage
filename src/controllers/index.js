const { Router } = require("express");
const errorHandlerMiddleware = require("../middlewares/error-handler.middleware");
const brandController = require("./brand.controller");
const filamentMaterialController = require("./filament-material.controller");
const filamentSettingsController = require("./filament-settings.controller");
const filamentController = require("./filament.controller");
const uploadController = require("./uploads.controller");
const printController = require("./print.controller");
const adminController = require("./admin.controller");
const authController = require("./auth.controller");
const bodyParserMiddleware = require("../middlewares/body-parser.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const controllers = Router();

controllers.use(bodyParserMiddleware);

controllers.use("/auth", authController);
controllers.use(authMiddleware);

controllers.use("/brands", brandController);
controllers.use("/filament-settings", filamentSettingsController);
controllers.use("/filament-materials", filamentMaterialController);
controllers.use("/filaments", filamentController);
controllers.use("/prints", printController);
controllers.use("/uploads", uploadController);
controllers.use("/admin", adminController);

controllers.use((_req, res) => {
    res.status(404).json({ error: "ENDPOINT_NOT_FOUND" });
});

controllers.use(errorHandlerMiddleware);

module.exports = controllers;
