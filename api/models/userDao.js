const { appDataSource } = require("./appDataSource");
const { detectError } = require("../utils/detectError");

//카카오 아이디로 기존 유저 여부 확인!
const checkUserBykakaoId = async (kakaoId) => {
  try {
    const [result] = await appDataSource.query(
      `
      SELECT EXISTS (
        SELECT
          kakao_id
        FROM
          users
        WHERE kakao_id = ?
      ) as checkKakaoUser
    `,
      [kakaoId]
    );
    return result;
  } catch (error) {
    console.error(error.stack);
    detectError("NOT_USER", 500);
  }
};

//기존 유저가 아닐 경우, 기본 정보 INSERT 하여 유저(회원가입)
const createUser = async (kakaoId, nickname, email) => {
  try {
    return await appDataSource.query(
      `
      INSERT INTO users (
        kakao_id,
        name,
        email
      ) VALUES (?, ?, ?)     
      `,
      [kakaoId, nickname, email]
    );
  } catch (error) {
    console.error(error.stack);
    detectError("CANNOT_CREATE_USER", 500);
  }
};

// 카카오아이디로 기존 유저인지 확인(userId, kakaoId)
const checkUserById = async (kakaoId) => {
  try {
    const [result] = await appDataSource.query(
      `
      SELECT
        id,
        kakao_id
      FROM
        users 
      WHERE kakao_id = ?
        `,
      [kakaoId]
    );
    return result;
  } catch (error) {
    console.error(error.stack);
    detectError("PLEASE_SIGNIN", 500);
  }
};

module.exports = { checkUserBykakaoId, createUser, checkUserById };
