const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const uploadFileMiddleware = require("../middlewares/uploadFile");
const {
    deleteFile,
    getFiles,
    uploadFile: uploadFileController,
} = require("../controllers/files.controller");

const router = express.Router();

router.delete("/:id", authenticateToken, deleteFile);
router.get("/", authenticateToken, getFiles);
router.post("/", authenticateToken, uploadFileMiddleware.single("file"), uploadFileController);

module.exports = router;
