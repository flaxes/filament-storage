const RepoService = require("../repo.service");

/**
 * @extends RepoService<PrintHistoryEntity>
 */
class PrintHistoryRepo extends RepoService {
    constructor() {
        super("filament_settings");
    }
}

const printHistoryRepo = new PrintHistoryRepo();

module.exports = printHistoryRepo;
