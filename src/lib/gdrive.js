const { auth, drive_v3 } = require("@googleapis/drive");
const { google } = require("../../config");

class Gdrive {
    #auth;
    #drive;
    #options;

    /**
     *
     * @param {typeof import('../../config')['google']} options
     */
    constructor(options) {
        this.#auth = new auth.GoogleAuth({
            keyFile: options.serviceAccountPath,
            scopes: ["https://www.googleapis.com/auth/drive"],
        });

        this.#drive = new drive_v3.Drive({ auth: this.#auth });
        this.#options = options;
    }

    async purgeFiles() {
        const data = await this.getAllFiles();

        if (!data.files) return;

        for (const file of data.files) {
            if (!file.id) continue;

            await this.#drive.files.delete({ fileId: file.id }).catch((err) => err);
        }
    }

    async getAllFiles() {
        const { data } = await this.#drive.files.list({
            q: `'${this.#options.sharedFolderId}' in parents and trashed=false`,
        });

        return data;
    }

    async getUploadsFiles() {
        const { data } = await this.#drive.files.list({
            q: `'${this.#options.uploadsFolderId}' in parents and trashed=false`,
        });

        return data;
    }

    async downloadFile(fileId) {
        const res = await this.#drive.files.get({ fileId, alt: "media" }, { responseType: "stream" });

        return res;
    }

    /**
     *
     * @param {import('stream').Readable} fileStream
     * @param {string} fileName
     * @param {string} mimeType
     * @param {boolean} [isStorage]
     * @returns
     */
    async uploadFile(fileStream, fileName, mimeType, isStorage) {
        const folderId = isStorage ? google.storageFolderId : google.uploadsFolderId;

        const res = await this.#drive.files.create({
            requestBody: {
                name: fileName,
                mimeType: mimeType,
                parents: [folderId],
            },
            media: {
                mimeType: mimeType,
                body: fileStream,
            },
        });

        return res;
    }

    async getUsage() {
        const res = await this.#drive.about.get({
            fields: "storageQuota",
        });

        return res.data.storageQuota;
    }
}

module.exports = Gdrive;
