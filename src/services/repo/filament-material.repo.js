const RepoService = require("../repo.service");

/**
 * @extends RepoService<FilamentMaterialEntity>
 */
class FilamentMaterialRepo extends RepoService {
    constructor() {
        super("filament_materials");
    }
}

const filamentMaterialRepo = new FilamentMaterialRepo();

module.exports = filamentMaterialRepo;
