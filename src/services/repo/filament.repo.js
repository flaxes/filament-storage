const RepoService = require("../repo.service");

/**
 * @extends RepoService<FilamentEntity>
 */
class FilamentRepo extends RepoService {
    constructor() {
        super("filaments");
    }
}

const filamentRepo = new FilamentRepo();

module.exports = filamentRepo;
