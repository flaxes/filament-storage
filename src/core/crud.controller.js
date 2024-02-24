const { Router, json } = require("express");
const AbstractRepo = require("../abstract/repo.abstract");
const { invalidRequest } = require("./http-exceptions");

/**
 * @param {AbstractRepo<any>} repo
 */
const crudController = (repo) => {
    const router = Router();

    router.get("/", async (_req, res) => {
        res.json(await repo.findAll());
    });
    router.get("/id/:id", async (req, res) => {
        res.json(await repo.findById(Number(req.params.id)));
    });

    router.use(json({ limit: "1mb" }));
    router.get("/find", async (req, res, next) => {
        if (!Array.isArray(req.query)) return next(invalidRequest);

        // @ts-ignore
        res.json(await repo.findByColumn(req.query.s));
    });

    router.post("/create", async (req, res) => {
        res.json(await repo.create(req.body.objects));
    });

    router.post("/update", async (req, res) => {
        res.json(await repo.update(req.body.objects));
    });

    router.post("/replace", async (req, res) => {
        res.json(await repo.replace(req.body.objects));
    });

    router.post("/delete", async (req, res) => {
        res.json({ count: await repo.delete(req.body.ids) });
    });

    return router;
};

module.exports = crudController;
