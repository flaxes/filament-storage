const crudController = require("../core/crud.controller");
const filamentRepo = require("../services/repo/filaments.repo");

const filamentsController = crudController(filamentRepo);

module.exports = filamentsController;
