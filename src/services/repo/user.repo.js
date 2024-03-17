const RepoService = require("../repo.service");

/**
 * @extends RepoService<UserEntity>
 */
class UserRepo extends RepoService {
    constructor() {
        super("users");
    }
}

const userRepo = new UserRepo();

module.exports = userRepo;
