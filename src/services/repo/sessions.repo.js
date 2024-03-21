const RepoService = require("../repo.service");

/**
 * @extends RepoService<SessionEntity>
 */
class SessionsRepo extends RepoService {
    constructor() {
        super("sessions");
    }
}

const sessionsRepo = new SessionsRepo();

module.exports = sessionsRepo;
