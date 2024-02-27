// @ts-check

const { notImplemented } = require("../lib/helpers");

/**
 * @template T
 */
class AbstractRepo {
    constructor(table) {
        /** @readonly */
        this.table = table;
    }

    /**
     * @abstract
     *
     * @param {Exclude<T, 'id'>[]} objects
     * @returns {Promise<T[]>}
     */
    create(objects) {
        return notImplemented();
    }

    /**
     * @abstract
     *
     * @param {Model<T>[]} objects
     * @returns {Promise<T[]>}
     */
    replace(objects) {
        return notImplemented();
    }

    /**
     * @abstract
     *
     * @param {ModelUpdate<T>[]} objects
     * @returns {Promise<T[]>}
     */
    update(objects) {
        return notImplemented();
    }

    /**
     * @abstract
     *
     * @param {number[]} ids
     * @returns {Promise<number>} - of deleted
     */
    delete(ids) {
        return notImplemented();
    }

    /**
     * @abstract
     *
     * @returns {Promise<Model<T>[]>}
     */
    findAll() {
        return notImplemented();
    }

    /**
     * @abstract
     *
     * @param {FindCriteria<T, keyof T>[]} criterias
     * @param {boolean} [strict]
     * @returns {Promise<Model<T>[]>}
     */
    findByColumn(criterias, strict) {
        return notImplemented();
    }

    /**
     * @abstract
     *
     * @param {number} id
     * @returns {Promise<Model<T> | void>}
     */
    findById(id) {
        return notImplemented();
    }
}

module.exports = AbstractRepo;
