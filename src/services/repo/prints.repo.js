const RepoService = require("../repo.service");

/**
 * @extends RepoService<PrintEntity>
 */
class PrintsRepo extends RepoService {
    constructor() {
        super("prints");
    }
}

const printsRepo = new PrintsRepo();

module.exports = printsRepo;
