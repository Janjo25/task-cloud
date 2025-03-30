const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const {createTask, getTasks, toggleCompletion, updateTask} = require("../controllers/tasks.controller");

const router = express.Router();

router.get('/', authenticateToken, getTasks);
router.patch("/:id", authenticateToken, updateTask);
router.patch("/:id/toggle", authenticateToken, toggleCompletion);
router.post("/create", authenticateToken, createTask);

module.exports = router;
