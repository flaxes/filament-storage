const multer = require("multer");

const uploadRepo = require("../services/repo/upload.repo");
const { uploadsPath } = require("../../config");
const crudController = require("../core/crud.controller");

const diskStorage = multer.diskStorage({
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
});

const uploadMiddleware = multer({ storage: diskStorage });
const uploadController = crudController(uploadRepo);

uploadController.post("/upload", uploadMiddleware.array("files[]"), async (req, res) => {
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
        });
    }

    const result = await uploadRepo.create(files);

    res.json(result);
});

uploadController.get("/get/:filename", (req, res) => {
    return res.sendFile(req.params.filename, { root: uploadsPath });
});

module.exports = uploadController;
