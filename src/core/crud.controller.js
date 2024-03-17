const { Router } = require("express");
const AbstractRepo = require("../abstract/repo.abstract");

/**
 * @param {AbstractRepo<any>} repo
 * @param {{ beforeDelete?: (ids) => Promise<any> }} events
 */
const crudController = (repo, events = {}) => {
    const router = Router();

    router.post("/", async (req, res) => {
        const promise = req.body.search ? repo.findByColumn(req.body.search, req.body.strict) : repo.findAll();

        res.json(await promise);
    });
    router.get("/id/:id", async (req, res) => {
        const result = await repo.findById(Number(req.params.id));

        res.json(result || { error: "not found" });
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
        const { ids } = req.body;
        if (events.beforeDelete) await events.beforeDelete(ids);

        res.json({ count: await repo.delete(ids) });
    });

    return router;
};

module.exports = crudController;
