const RepoService = require("../repo.service");

/**
 * @extends RepoService<FilamentEntity>
 */
class FilamentsRepo extends RepoService {
    constructor() {
        super("filaments");
    }
}

const filamentsRepo = new FilamentsRepo();

module.exports = filamentsRepo;
