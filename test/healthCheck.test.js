const request = require("supertest");

const { createApp } = require("../app");
const { appDataSource } = require("../api/models/appDataSource");

describe("health check", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
  });

  afterAll(async () => {
    await appDataSource.destroy();
  });

  test("SUCCESS: health check", async () => {
    await request(app).get("/ping").expect(200).expect({ message: "pong" });
  });
});
