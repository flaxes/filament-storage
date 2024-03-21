const RepoService = require("../repo.service");

/**
 * @extends RepoService<UserEntity>
 */
class UsersRepo extends RepoService {
    constructor() {
        super("users");
    }
}

const usersRepo = new UsersRepo();

module.exports = usersRepo;
