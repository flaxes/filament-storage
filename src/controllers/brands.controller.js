const crudController = require("../core/crud.controller");
const brandRepo = require("../services/repo/brands.repo");

const brandsController = crudController(brandRepo);

module.exports = brandsController;
