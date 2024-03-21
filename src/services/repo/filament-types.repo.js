const RepoService = require("../repo.service");

/**
 * @extends RepoService<FilamentTypeEntity>
 */
class FilamentTypesRepo extends RepoService {
    constructor() {
        super("filament_types");
    }
}

const filamentTypesRepo = new FilamentTypesRepo();

module.exports = filamentTypesRepo;
