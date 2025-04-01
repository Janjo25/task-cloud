const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const {uploadFile} = require("../controllers/files.controller");

const router = express.Router();

router.post("/", authenticateToken, uploadFile);

module.exports = router;
