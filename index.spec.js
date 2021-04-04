var { assert, expect } = require("chai");
var { signup, signin } = require("./index.js");
var { User, Res } = require("./entities");

describe("Authentication", function () {
  describe("sign up", function () {
    it("Should be loaded", function () {
      assert.typeOf(signup, "function");
    });

    it("Should return an object", function () {
      assert.typeOf(signup(), "object");
    });

    it("Returned value should have 'ok' boolean property, message string property and data", function () {
      const res = signup();
      expect(res).to.contain.keys("ok", "message", "data");
    });

    it("Returned value should be based on Res class", function () {
      const res = signup();
      expect(res).to.be.an.instanceof(Res);
    });

    it("Returned data should contain user object based on User class if sign up is successful", function () {
      const res = signup("mail@mail.com", "pass1234*");
      expect(res.data).to.be.an.instanceof(User);
    });

    it("Should sign up with correct email and password", function () {
      const res = signup("mail@mail.com", "pass1234*");
      expect(res).to.deep.include({ ok: true });
    });

    it("Should NOT sign up with not provided email and/or password", function () {
      const res = signup("mail@mail.com", null);
      const res2 = signup(null, "test1234*");
      const res3 = signup(null, null);

      expect(res).to.deep.include({ ok: false });
      expect(res2).to.deep.include({ ok: false });
      expect(res3).to.deep.include({ ok: false });
    });

    it("Should NOT sign up if pass is less then 8 symbols", function () {
      const res = signup("mail@mail.com", "test1234");

      expect(res).to.deep.include({ ok: false });
    });

    it("Should NOT sign up if pass doesn't have special characters", function () {
      const res = signup("mail@mail.com", "test12345");

      expect(res).to.deep.include({ ok: false });
    });

    it("Should NOT sign up if user exists", function () {
      const email = "sasha@gmail.com";
      const password = "test1234*";

      const res = signup(email, password);

      expect(res).to.deep.include({ ok: false });
    });
  });

  describe("sign in", function () {
    it("Should be loaded", function () {
      expect(signin).to.be.an("function");
    });

    it("Should return an object", function () {
      expect(signin()).to.be.an("object");
    });

    it("Returned value should have 'ok' boolean property and message string property", function () {
      return expect(signin()).to.contain.keys("ok", "message");
    });

    it("Should sign in with provided correct email and password", async () => {
      const email = "sasha@gmail.com";
      const password = "test1234*";
      const res = await signin(email, password)
      return expect(res).to.deep.include({ ok: true });
    });

    it("Should NOT sign in with incorrect email /or password", function () {
      const res = signin("sasha2@gmail.com", "test1234*");
      const res2 = signin("sasha@gmail.com", "test1234");
      const res3 = signin(null, "test1234*");
      const res4 = signin("sasha@gmail.com", null);
      const res5 = signin(null, null);

      expect(res).to.deep.include({ ok: false });
      expect(res2).to.deep.include({ ok: false });
      expect(res3).to.deep.include({ ok: false });
      expect(res4).to.deep.include({ ok: false });
      expect(res5).to.deep.include({ ok: false });
    });
  });
});
