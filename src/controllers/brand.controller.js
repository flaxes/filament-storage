const crudController = require("../core/crud.controller");
const brandRepo = require("../services/repo/brand.repo");

const brandController = crudController(brandRepo);

module.exports = brandController;
