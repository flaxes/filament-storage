const fs = require("fs");
const { uploadsPath } = require("../../../config");
const RepoService = require("../repo.service");

if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath);

/**
 * @extends RepoService<UploadEntity>
 */
class UploadRepo extends RepoService {
    constructor() {
        super("uploads");
    }

    createUploadStream(filename) {
        const filePath = `${uploadsPath}/${filename}`;

        if (fs.existsSync(filePath)) {
            return "ALREADY_EXISTS";
        }

        const stream = fs.createWriteStream(filePath);

        return stream;
    }

    async delete(ids) {
        for (const id of ids) {
            const file = await this.findById(id);
            if (!file) continue;

            const filePath = `${uploadsPath}/${file.fileName}`;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        return super.delete(ids);
    }
}

const uploadRepo = new UploadRepo();

module.exports = uploadRepo;
