const { appDataSource } = require("./appDataSource");
const { detectError } = require("../utils/detectError");

//카카오 아이디로 기존 유저 여부 확인!
const checkUserBykakaoId = async (kakaoId) => {
  const [checkUser] = await appDataSource.query(
    `
      SELECT
        id
      FROM
        users
      WHERE
        kakao_id = ?
    `,
    [kakaoId]
  );

  return checkUser;
};

// 기존 유저가 아닐 경우, 기본 정보 INSERT 하여 유저(회원가입)
const createUser = async (kakaoId, nickname, profile_image, email) => {
  try {
    return await appDataSource.query(
      `
      INSERT INTO users (
        kakao_id,
        name,
        profile_image,
        email
      ) VALUES (?, ?, ?, ?)
      `,
      [kakaoId, nickname, profile_image, email]
    );
  } catch (error) {
    console.log(error);
    detectError("CANNOT_CREATE_USER", 400);
  }
};

module.exports = { checkUserBykakaoId, createUser };
