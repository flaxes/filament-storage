const { Router } = require("express");
const multer = require("multer");

const uploadRepo = require("../services/repo/upload.repo");
const { uploadsPath } = require("../../config");

const diskStorage = multer.diskStorage({
    destination(req, _file, cb) {
        if (!req.body.cdntoken) {
            return cb(new Error("NO_CDNTOKEN"), "");
        }

        cb(null, uploadsPath);
    },

    filename(_req, file, cb) {
        /* let extension = "";
        const parts = file.originalname.split(".");
        if (parts.length > 1) extension = parts.pop() || "";
        const filename = `${Date.now()}.${extension}`; */

        cb(null, file.originalname);
    },
});

const uploadMiddleware = multer({ storage: diskStorage });

const uploadController = Router();

uploadController.post("/create", uploadMiddleware.array("files[]"), (req, res) => {
    console.log(req.files);

    console.log(req.body);

    res.json({ success: true });
});

module.exports = uploadController;
