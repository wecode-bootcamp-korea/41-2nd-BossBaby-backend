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
  //담아오는 데이터 확인
  console.log(result);

  const { data } = result;
  const kakaoId = data.id;
  const nickname = data.properties.nickname;
  const email = data.kakao_account.email;

  if (!kakaoId || !nickname || !email) {
    detectError("Token_Error", 400);
  }

  //카카오 유저인지 확인 후, 토큰 발급 - 새로운 유저
  const { checkKakaoUser } = await userDao.checkUserBykakaoId(kakaoId);

  if (checkKakaoUser === "0") {
    const newUser = await userDao.createUser(kakaoId, nickname, email);

    //last_insert_id와 inserId의 차이점..
    const accessToken = jwt.sign(
      { userId: newUser.insertId },
      process.env.JWT_SECRET
    );

    return accessToken;
  }

  //kakaoId로 유저인지 확인 후, 토큰 발급 - 기존 유저 (userId로 확인)
  const user = await userDao.checkUserById(kakaoId);

  const accessToken = await jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET
  );

  return accessToken;
};

module.exports = { kakaoLogin };
