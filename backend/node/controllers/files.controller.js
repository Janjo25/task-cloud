const {MulterError} = require("multer");
const upload = require("../middlewares/uploadFile");
const {saveFile} = require("../models/files.model");

function uploadFile(request, response) {
    upload.single("file")(request, response, async (error) => {
        if (error) {
            console.error("ERROR - Multer failed:", error);

            if (error instanceof MulterError) {
                return response.status(400).json({error: "Error al procesar el archivo."});
            }

            return response.status(400).json({error: error.message});
        }

        // Validates that a file was uploaded.
        if (!request.file) return response.status(400).json({error: "No se proporcionó ningún archivo."});

        try {
            // noinspection SpellCheckingInspection
            const {originalname, mimetype, filename} = request.file;
            const accountId = request.user.id;
            const fileUrl = `${request.protocol}://${request.get("host")}/uploads/${filename}`;

            const file = await saveFile(originalname, mimetype, fileUrl, accountId);

            return response.status(201).json({
                file,
                message: "Archivo subido exitosamente.",
            });
        } catch (error) {
            console.error("ERROR - Failed to save file:", error);
            return response.status(500).json({error: "Error interno al guardar el archivo."});
        }
    });
}

module.exports = {
    uploadFile,
};
