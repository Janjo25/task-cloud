const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const {createTask, deleteTask, getTasks, toggleCompletion, updateTask} = require("../controllers/tasks.controller");

const router = express.Router();

router.delete("/:id", authenticateToken, deleteTask);
router.get("/", authenticateToken, getTasks);
router.patch("/:id", authenticateToken, updateTask);
router.patch("/:id/toggle", authenticateToken, toggleCompletion);
router.post("/", authenticateToken, createTask);

module.exports = router;
