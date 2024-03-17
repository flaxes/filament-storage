const fs = require("fs");

const { repoPath } = require("../../config");
const AbstractRepo = require("../abstract/repo.abstract");
const { getNowSeconds } = require("../lib/helpers");

if (!fs.existsSync(repoPath)) fs.mkdirSync(repoPath);

/**
 * @template T
 * @extends AbstractRepo<T>
 */
class RepoFs extends AbstractRepo {
    constructor(table) {
        super(table);

        this.filePath = `${repoPath}/${table}.json`;

        /** @type {FsRepoStorage<T>} */
        this.store = fs.existsSync(this.filePath)
            ? JSON.parse(fs.readFileSync(this.filePath, { encoding: "utf-8" }))
            : {
                  data: {},
                  lastIndex: 0,
              };
    }

    /**
     *
     * @param {T[]} objects
     * @param {number} [creatorId]
     * @returns {Promise<Model<T>[]>}
     */
    async create(objects, creatorId) {
        /** @type {Model<T>[]} */
        const result = [];
        for (const object of objects) {
            /** @type {Model<T>} */ // @ts-ignore
            const o = object;

            o.creatorId = creatorId;

            o.id = ++this.store.lastIndex;
            o.createdAt = getNowSeconds();
            this.store.data[o.id] = o;

            result.push(o);
        }

        this.save();

        return result;
    }

    /**
     *
     * @param {Model<T>[]} objects
     * @returns {Promise<Model<T>[]>}
     */
    async replace(objects) {
        const result = [];
        for (const object of objects) {
            this.store.data[object.id] = object;
            object.updatedAt = getNowSeconds();
            result.push(object);
        }
        this.save();

        return result;
    }

    /**
     *
     * @param {ModelUpdate<T>[]} objects
     * @returns {Promise<Model<T>[]>}
     */
    async update(objects) {
        /** @type {Model<T>[]} */
        const result = [];
        for (const object of objects) {
            const oldObject = this.store.data[object.id];
            if (!oldObject) continue;

            Object.assign(oldObject, object);
            oldObject.updatedAt = getNowSeconds();
            result.push(oldObject);
        }

        this.save();
        return result;
    }

    /**
     *
     * @param {number[]} ids
     * @returns {Promise<number>} - of deleted
     */
    async delete(ids) {
        let count = 0;

        for (const id of ids) {
            if (this.store.data[id]) {
                count++;
                delete this.store.data[id];
            }
        }

        if (count) {
            this.save();
        }

        return count;
    }

    /**
     *
     * @returns {Promise<Model<T>[]>}
     */
    async findAll() {
        return Object.values(this.store.data);
    }

    /**
     *
     * @param {FindCriteria<Model<T>, keyof Model<T>>[]} criterias
     * @param {boolean} [isStrict] - ignore cases
     * @returns {Promise<Model<T>[]>}
     */
    async findByColumn(criterias, isStrict) {
        const all = await this.findAll();

        if (!isStrict) {
            for (const criteria of criterias) {
                criteria[1] = criteria[1].toLowerCase();
            }
        }

        const result = all.filter((item) => {
            for (const criteria of criterias) {
                const val = item[criteria[0]];
                if (!val) continue;

                if (isStrict) {
                    return val === criteria[1];
                }

                if ((val + "").toLowerCase().includes(criteria[1])) {
                    return true;
                }
            }

            return false;
        });

        return result;
    }

    /**
     * @abstract
     *n
     * @param {number} id
     * @returns {Promise<Model<T> | void>}
     */
    async findById(id) {
        return this.store.data[id];
    }

    save() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.store));
    }
}
module.exports = RepoFs;
