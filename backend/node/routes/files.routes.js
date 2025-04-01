const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const {getFiles, uploadFile} = require("../controllers/files.controller");

const router = express.Router();

router.get("/", authenticateToken, getFiles);
router.post("/", authenticateToken, uploadFile);

module.exports = router;
