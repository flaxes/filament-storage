const RepoService = require("../repo.service");

/**
 * @extends RepoService<PrintEntity>
 */
class PrintRepo extends RepoService {
    constructor() {
        super("prints");
    }
}

const printRepo = new PrintRepo();

module.exports = printRepo;
