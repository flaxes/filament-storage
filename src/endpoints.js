// @ts-check

const { Router } = require("express");
const storage = require("./storage");

const endpointsRouter = Router();

endpointsRouter.get("/types/add", (req, res) => {
    storage.addType(req.query.type);

    res.status(200).json({ success: true });
});

endpointsRouter.get("/types/delete", (req, res) => {
    storage.deleteType(req.query.type);

    res.status(200).json({ success: true });
});

endpointsRouter.get("/brands/add", (req, res) => {
    storage.addBrand(req.query.brand);

    res.status(200).json({ success: true });
});

endpointsRouter.get("/brands/delete", (req, res) => {
    storage.addBrand(req.query.brand);

    res.status(200).json({ success: true });
});

endpointsRouter.get("/filaments/add", (req, res) => {
    /** @type {Filament} */ // @ts-ignore
    const filament = JSON.parse(req.query.filament);
    filament.created_at = Date.now();

    storage.addType(filament);

    res.status(200).json({ success: true });
});

endpointsRouter.get("/filaments/update", (req, res) => {
    /** @type {Filament} */ // @ts-ignore
    const filament = JSON.parse(req.query.filament);
    filament.created_at = Date.now();

    storage.addFilament(filament);

    res.status(200).json({ success: true });
});

endpointsRouter.get("/filaments/update", (req, res) => {
    /** @type {Filament} */ // @ts-ignore
    const filament = JSON.parse(req.query.filament);
    filament.updated_at = Date.now();

    storage.updateFilament(req.query.id, filament);

    res.status(200).json({ success: true });
});

endpointsRouter.get("/filaments/delete", (req, res) => {
    storage.deleteFilament(req.query.filamentId);

    res.status(200).json({ success: true });
});

module.exports = endpointsRouter;
