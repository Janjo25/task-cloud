const express = require("express");
const {loginUser, registerUser} = require("../controllers/users.controller");

const router = express.Router();

router.post("/login", (request, response) => loginUser(request, response));
router.post("/register", (request, response) => registerUser(request, response));

module.exports = router;
