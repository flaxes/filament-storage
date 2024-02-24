const RepoService = require("../repo.service");

/**
 * @extends RepoService<BrandEntity>
 */
class BrandRepo extends RepoService {
    constructor() {
        super("brands");
    }
}

const brandRepo = new BrandRepo();

module.exports = brandRepo;
