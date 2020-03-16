process.env.NODE_ENV = "test";
const request = require("supertest");
const { assert } = require("chai");
const mock = require("../mock");
const app = require("../../index");
const connectDB = require("../../db");

describe("user controller", () => {
  describe("POST /send", () => {
    before(() => {
      connectDB();
    });
    it("should return a user", async () => {
      const { body: result, status } = await request(app)
        .post("/api/user/send")
        .send({
          email: mock.email,
          firstName: mock.firstName,
          lastName: mock.lastName,
          password: mock.password
        });
      assert.strictEqual(status, 200);
      assert.isObject(result);
      assert.property(result, "_id");
    });
  });
  describe("GET /all", () => {
    it("should return all users", async () => {
      const { body: result } = await request(app).get("/api/user/all");
      assert.isArray(result);
      assert.isAtLeast(result.length, 1);
    });
  });
});
