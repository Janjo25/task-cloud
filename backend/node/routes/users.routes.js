const express = require("express");
const uploadAvatarMiddleware = require("../middlewares/uploadAvatar");
const {loginUser, registerUser} = require("../controllers/users.controller");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", uploadAvatarMiddleware.single("profileImage"), registerUser);

module.exports = router;
