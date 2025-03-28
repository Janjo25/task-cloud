const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const {createTask, getTasks} = require("../controllers/tasks.controller");

const router = express.Router();

router.get('/', authenticateToken, getTasks);
router.post("/create", authenticateToken, createTask);

module.exports = router;
