const axios = require("axios");
const request = require("supertest");

const { appDataSource } = require("../api/models/appDataSource");
const { createApp } = require("../app");

describe("KAKAO-LOGIN", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
  });

  afterAll(async () => {
    await appDataSource.query(`SET foreign_key_checks = 0`);
    await appDataSource.query(`TRUNCATE users`);
    await appDataSource.query(`SET foreign_key_checks = 1`);
    await appDataSource.destroy();
  });

  test("FAILED: NEED_ACCESS_TOKEN", async () => {
    await request(app)
      .post("/auth/kakao-login")
      .send({ message: "NEED_ACCESS_TOKEN" })
      .expect(404);
  });

  test("SUCCESS: LOGIN_SUCCESS_WITH_ACCESS_TOKEN", async () => {
    axios.get = jest.fn().mockReturnValue({
      data: {
        id: 123123,
        properties: {
          nickname: "test",
          profile_image: "asdf.png",
        },
        kakao_account: {
          email: "test@test.com",
        },
      },
    });

    await request(app)
      .post("/auth/kakao-login")
      .send({ authorization: "MOCK_ACCESS_TOKEN" })
      .expect(200);
  });

  test("FAILED: LOGIN_FAILED_NO_KAKAO_USER_INFORMATION", async () => {
    axios.get = jest.fn().mockReturnValue({
      data: {
        id: "",
        properties: {
          nickname: "test",
          profile_image: "asdf.png",
        },
        kakao_account: {
          email: "test@test.com",
        },
      },
    });

    await request(app)
      .post("/auth/kakao-login")
      .send({ authorization: "MOCK_ACCESS_TOKEN" })
      .expect(404);
  });
});
