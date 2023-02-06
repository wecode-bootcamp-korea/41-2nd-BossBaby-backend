const express = require("express");
const router = express.Router();
const { validateToken } = require("../utils/auth");

const userController = require("../controllers/userController");

router.post("/kakao-login", userController.kakaoLogin);
router.get("/userInfo", validateToken, userController.userInfo);

module.exports = { router };
