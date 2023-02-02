const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/kakao-login", userController.kakaoLogin);

module.exports = { router };
