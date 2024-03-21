const { Router } = require("express");
const errorHandlerMiddleware = require("../middlewares/error-handler.middleware");
const brandController = require("./brands.controller");
const filamentMaterialController = require("./filament-materials.controller");
const filamentSettingsController = require("./filament-settings.controller");
const filamentController = require("./filaments.controller");
const uploadController = require("./uploads.controller");
const printController = require("./prints.controller");
const adminController = require("./admin.controller");
const authController = require("./auth.controller");
const bodyParserMiddleware = require("../middlewares/body-parser.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const uploadGDriveController = require("./uploads-gdrive.controller");
const { google } = require("../../config");
const filamentTypesController = require("./filament-types.controller");

const controllers = Router();

controllers.use(bodyParserMiddleware);

controllers.use("/auth", authController);
controllers.use(authMiddleware);

controllers.use("/brands", brandController);
controllers.use("/filament-settings", filamentSettingsController);
controllers.use("/filament-types", filamentTypesController);
controllers.use("/filament-materials", filamentMaterialController);
controllers.use("/filaments", filamentController);
controllers.use("/prints", printController);

if (google.isEnabled) {
    controllers.use("/uploads", uploadGDriveController);
} else {
    controllers.use("/uploads", uploadController);
}

//
controllers.use("/admin", adminController);

controllers.use((_req, res) => {
    res.status(404).json({ error: "ENDPOINT_NOT_FOUND" });
});

controllers.use(errorHandlerMiddleware);

module.exports = controllers;
