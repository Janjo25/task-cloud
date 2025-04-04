const {MulterError} = require("multer");

function errorHandler(error, request, response, _) {
    if (error instanceof MulterError) {
        console.error("ERROR - Multer failed:", error);
        return response.status(400).json({error: "Error al procesar el archivo."});
    }

    switch (error.name) {
        case "InvalidFileTypeError":
            console.error("ERROR - Invalid file type:", error);
            return response.status(400).json({error: error.message});
        default:
            break;
    }

    console.error("ERROR - Unhandled error:", error);
    return response.status(500).json({error: "Error interno del servidor."});
}

module.exports = errorHandler;
