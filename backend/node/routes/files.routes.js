const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const {deleteFile, getFiles, uploadFile} = require("../controllers/files.controller");

const router = express.Router();

router.delete("/:id", authenticateToken, deleteFile);
router.get("/", authenticateToken, getFiles);
router.post("/", authenticateToken, uploadFile);

module.exports = router;
