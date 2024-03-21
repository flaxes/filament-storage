const RepoService = require("../repo.service");

/**
 * @extends RepoService<FilamentMaterialEntity>
 */
class FilamentMaterialsRepo extends RepoService {
    constructor() {
        super("filament_materials");
    }
}

const filamentMaterialsRepo = new FilamentMaterialsRepo();

module.exports = filamentMaterialsRepo;
