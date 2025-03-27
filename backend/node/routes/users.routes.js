const express = require("express");
const {registerUser} = require("../controllers/users.controller");

const router = express.Router();

router.post("/register", (request, response) => registerUser(request, response));

module.exports = router;
