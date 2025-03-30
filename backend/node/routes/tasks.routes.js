const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const {createTask, deleteTask, getTasks, toggleCompletion, updateTask} = require("../controllers/tasks.controller");

const router = express.Router();

// TODO : Change task creation route to follow conventions.
// TODO : Change task retrieval single quotes to double quotes.
router.delete("/:id", authenticateToken, deleteTask);
router.get('/', authenticateToken, getTasks);
router.patch("/:id", authenticateToken, deleteTask);
router.patch("/:id", authenticateToken, updateTask);
router.patch("/:id/toggle", authenticateToken, toggleCompletion);
router.post("/create", authenticateToken, createTask);

module.exports = router;
