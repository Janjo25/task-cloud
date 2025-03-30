const multer = require("multer");
const path = require("path");

// noinspection JSDuplicatedDeclaration,JSUnusedGlobalSymbols
/**
 * Configures Multer to store uploaded files on disk.
 *
 * - destination: resolves the absolute path to the "uploads" folder using path.join.
 * - filename: appends a unique suffix to the original file name to avoid collisions.
 *
 * The configured storage is passed to Multer, which returns a reusable middleware for handling single file uploads.
 */
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads"));
    },
    filename: (request, file, cb) => {
        const extension = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, extension);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, `${baseName}-${uniqueSuffix}${extension}`);
    },
});

const upload = multer({
    fileFilter: (request, file, cb) => {
        const allowedTypes = ["text/plain"];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Tipo de archivo no permitido. Solo se permiten archivos de texto."), false);
        }
    },
    storage,
});

module.exports = upload;
