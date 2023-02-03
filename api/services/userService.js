const jwt = require("jsonwebtoken");
const axios = require("axios");
const detectError = require("../utils/detectError");
const userDao = require("../models/userDao");

const kakaoLogin = async (kakaoToken) => {
  const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  if (!result) {
    detectError("Token_Error", 400);
  }

  const { data } = result;
  const kakaoId = data.id;
  const nickname = data.properties.nickname;
  const profile_image = data.properties.profile_image;
  const email = data.kakao_account.email;

  const userId = await userDao.checkUserBykakaoId(kakaoId);

  // 카카오 유저인지 확인 후, 토큰 발급 - 새로운 유저
  if (!userId) {
    const newUser = await userDao.createUser(
      kakaoId,
      nickname,
      profile_image,
      email
    );

    return (accessToken = jwt.sign(
      { userId: newUser.insertId },
      process.env.JWT_SECRET
    ));
  }
  return (accessToken = jwt.sign({ userId: userId }, process.env.JWT_SECRET));
};

module.exports = { kakaoLogin };
