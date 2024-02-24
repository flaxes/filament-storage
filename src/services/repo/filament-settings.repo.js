const RepoService = require("../repo.service");

/**
 * @extends RepoService<FilamentSettingsEntity>
 */
class FilamentSettingsRepo extends RepoService {
    constructor() {
        super("filament_settings");
    }
}

const filamentSettingsRepo = new FilamentSettingsRepo();

module.exports = filamentSettingsRepo;
