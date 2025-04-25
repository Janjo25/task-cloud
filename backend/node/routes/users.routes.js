const express = require("express");
const uploadAvatarMiddleware = require("../middlewares/uploadAvatar");
const {loginUser, registerUser} = require("../controllers/users.controller");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
