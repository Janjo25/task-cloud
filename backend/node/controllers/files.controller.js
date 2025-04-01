const {MulterError} = require("multer");
const upload = require("../middlewares/uploadFile");
const {
    deleteFile: deleteFileModel,
    getFilesByUserId,
    saveFile,
} = require("../models/files.model");

async function deleteFile(request, response) {
    const accountId = request.user.id;
    const fileId = parseInt(request.params.id, 10);

    // Validates that the file ID is a number.
    if (isNaN(fileId)) return response.status(400).json({error: "ID de archivo inválido."});

    try {
        // Deletes the file from the database.
        const deleted = await deleteFileModel(fileId, accountId);

        // Checks if the file was deleted.
        if (!deleted) return response.status(404).json({error: "Archivo no encontrado."});

        return response.status(200).json({
            deleted,
            message: "Archivo eliminado exitosamente.",
        });
    } catch (error) {
        console.error("ERROR - Failed to delete file:", error);
        return response.status(500).json({error: "Error interno al eliminar el archivo."});
    }
}

async function getFiles(request, response) {
    const accountId = request.user.id;

    try {
        // Retrieves the files from the database.
        const files = await getFilesByUserId(accountId);
        return response.status(200).json({
            files,
            message: "Archivos obtenidos exitosamente.",
        });
    } catch (error) {
        console.error("ERROR - Failed to get files:", error);
        return response.status(500).json({error: "Error interno al obtener archivos."});
    }
}

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
    deleteFile,
    getFiles,
    uploadFile,
};
