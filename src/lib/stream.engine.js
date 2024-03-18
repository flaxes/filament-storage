/* req: Request,
file: Express.Multer.File,
callback: (error?: any, info?: Partial<Express.Multer.File>) => void,
): void;

_removeFile(
req: Request,
file: Express.Multer.File,
callback: (error: Error | null) => void, */

module.exports = class StreamEngine {
    /**
     *
     * @param {(file: Express.Multer.File) => Promise<Express.Multer.File>} handleStream
     */
    constructor(handleStream) {
        this.handleStream = handleStream;
    }

    /**
     *
     * @param {import("express").Request} _req
     * @param {Express.Multer.File} file
     * @param {(error?: any, info?: Partial<Express.Multer.File>) => void} callback
     */
    _handleFile(_req, file, callback) {
        this.handleStream(file)
            .then((res) => callback(null, res))
            .catch((err) => callback(err));
    }
    /**
     * Remove the file described by `file`, then invoke the callback with.
     *
     * `file` contains all the properties available to `_handleFile`, as
     * well as those returned by `_handleFile`.
     *
     * @param {import("express").Request} _req
     * @param {Express.Multer.File} _file
     * @param {(error: Error | null) => void} callback
     */
    _removeFile(_req, _file, callback) {
        callback(null);
    }
};
