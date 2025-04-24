const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const { registerUploadedFile } = require("../controllers/files.controller");

const {
    deleteFile,
    getFiles,
    uploadFile: uploadFileController,
} = require("../controllers/files.controller");

const router = express.Router();

router.delete("/:id", authenticateToken, deleteFile);
router.get("/", authenticateToken, getFiles);

router.post("/register-s3", authenticateToken, express.json(), registerUploadedFile);

module.exports = router;
