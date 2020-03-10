process.env.NODE_ENV = "test";
const { connectDB } = require("../db");
const { create } = require("../services/user");
const { expect, assert } = require("chai");

describe("user services", () => {
  describe("create()", () => {
    before(() => {
      connectDB();
    });
    it("should return user", async () => {
      let result = await create("email", "fname", "lname", "123456");
      assert.typeOf(result, "object");
    });
  });
});
