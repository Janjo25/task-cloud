const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const {createTask} = require("../controllers/tasks.controller");

const router = express.Router();

router.post("/create", authenticateToken, createTask);

module.exports = router;
