const fs = require("fs");
const { uploadsPath } = require("../../../config");
const RepoService = require("../repo.service");
const gdrive = require("../../instances/gdrive.instance");
const { wait } = require("../../lib/helpers");
const createLoggerSimple = require("../../lib/logger");

if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath);

const logger = createLoggerSimple("UploadsRepo");

/**
 * @extends RepoService<UploadEntity>
 */
class UploadsRepo extends RepoService {
    constructor() {
        super("uploads");
    }

    async delete(ids) {
        for (const id of ids) {
            const file = await this.findById(id);
            if (!file) continue;

            if (file.gdriveId) {
                await gdrive
                    .deleteFile(file.gdriveId)
                    .catch((err) => logger.error(`OnFileDelete ${file.id}. ${err.message}`, err));
                await wait(50);
            } else {
                const filePath = `${uploadsPath}/${file.fileName}`;
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
        }

        const result = await super.delete(ids);

        return result;
    }
}

const uploadsRepo = new UploadsRepo();

module.exports = uploadsRepo;
