const multer = require("multer");

const uploadRepo = require("../services/repo/upload.repo");
const { uploadsPath } = require("../../config");
const crudController = require("../core/crud.controller");
const StreamEngine = require("../lib/stream.engine");
const gdrive = require("../instances/gdrive.instance");

/* const diskStorage = multer.diskStorage({
    destination(req, _file, cb) {
        if (!req.body.cdntoken) {
            return cb(new Error("NO_CDNTOKEN"), "");
        }

        cb(null, uploadsPath);
    },

    filename(_req, file, cb) {
        let extension = "";
        const parts = file.originalname.split(".");
        if (parts.length > 1) extension = parts.pop() || "";

        const postfix = ~~(Date.now() / 1000);
        const filename = `${parts.join(".")}_${postfix}.${extension}`;

        cb(null, filename);
    },
}); */

const streamStorage = new StreamEngine(async (file) => {
    let extension = "";
    const parts = file.originalname.split(".");
    if (parts.length > 1) extension = parts.pop() || "";

    const postfix = ~~(Date.now() / 1000);
    const filename = `${parts.join(".")}_${postfix}.${extension}`;

    const result = await gdrive.uploadFile(file.stream, filename, file.mimetype);

    file.filename = filename;
    file.path = result.data.id || "";

    return file;
});

const uploadMiddleware = multer({ storage: streamStorage });
const uploadGDriveController = crudController(uploadRepo);

uploadGDriveController.post("/upload", uploadMiddleware.array("files[]"), async (req, res) => {
    if (!Array.isArray(req.files) || !req.files.length) {
        return res.json({ error: "no files" });
    }

    /** @type {UploadEntity[]} */
    const files = [];
    for (const file of req.files) {
        files.push({
            mimetype: file.mimetype,
            sizeMb: Number((file.size / 1024 / 1024).toFixed(3)),
            fileName: file.filename,
            isPhoto: !!req.body.isPhoto,
            gdriveId: file.path,
        });
    }

    const result = await uploadRepo.create(files);

    res.json(result);
});

uploadGDriveController.get("/get/:filename", async (req, res) => {
    const [file] = await uploadRepo.findByColumn([["fileName", req.params.filename]]);

    if (!file) return res.status(404).end("fileinfo not found");
    if (!file.gdriveId) return res.status(404).end("gdriveid is empty");

    const { headers, data } = await gdrive.downloadFile(file.gdriveId);
    const requiredHeaders = ["content-type", "content-length"];

    for (const header of requiredHeaders) {
        const val = headers[header];
        if (val) res.setHeader(header, val);
    }

    data.on("error", (err) => {
        console.error(err);
    });

    data.pipe(res);
});

module.exports = uploadGDriveController;
