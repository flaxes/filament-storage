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
}

const uploadRepo = new UploadRepo();

module.exports = uploadRepo;
