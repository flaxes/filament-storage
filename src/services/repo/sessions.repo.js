const RepoService = require("../repo.service");

/**
 * @extends RepoService<SessionEntity>
 */
class SessionRepo extends RepoService {
    constructor() {
        super("sessions");
    }
}

const sessionRepo = new SessionRepo();

module.exports = sessionRepo;
