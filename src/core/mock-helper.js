const AbstractRepo = require("../abstract/repo.abstract");

/**
 * @template T
 *
 * @param {AbstractRepo<T>} repo
 * @param {Exclude<T, 'id'>[]} objects
 */
const mockHelper = async (repo, objects) => {
    const result = await repo.create(objects);

    return result;
};

module.exports = mockHelper;
