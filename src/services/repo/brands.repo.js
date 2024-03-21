const RepoService = require("../repo.service");

/**
 * @extends RepoService<BrandEntity>
 */
class BrandsRepo extends RepoService {
    constructor() {
        super("brands");
    }
}

const brandsRepo = new BrandsRepo();

module.exports = brandsRepo;
