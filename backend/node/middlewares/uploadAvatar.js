const multer = require("multer");
const path = require("path");

// noinspection JSDuplicatedDeclaration,JSUnusedGlobalSymbols
/**
 * Configures Multer to store uploaded avatars on disk.
 *
 * - destination: resolves the absolute path to the "storage" folder using path.join.
 * - filename: appends a unique suffix to the original avatar name to avoid collisions.
 *
 * The configured storage is passed to Multer, which returns a reusable middleware for handling single avatar uploads.
 */
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, path.join(__dirname, "..", "storage", "profile-avatars"));
    },
    filename: (request, file, cb) => {
        const extension = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, extension);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, `${baseName}-${uniqueSuffix}${extension}`);
    },
});

const uploadAvatar = multer({
    fileFilter: (request, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            const error = new Error("Tipo de archivo no permitido. Solo se permiten imágenes.");
            error.name = "InvalidFileTypeError";
            cb(error, false);
        }
    },
    storage,
});

module.exports = uploadAvatar;
