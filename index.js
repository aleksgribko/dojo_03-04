const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { newToken, checkPasswords, hashPassword } = require("./helpers");
const { db } = require("./DB");
const { User, Res } = require("./entities");

const signup = (email, password) => {
  const passFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!email || !password || password.length < 8 || !password.match(passFormat))
    return new Res(false, "input is incorrect", null);

  const registeredUser = db.users.find((el) => el.email == email);

  if (registeredUser) {
    return new Res(false, "user exist", null);
  }

  const passwordHashed = hashPassword(password);
  const idUser = uuidv4();

  const response = new Res(
    true,
    "user is registered",
    new User(idUser, email, passwordHashed, newToken(idUser))
  );

  return response;
};

const signin = (email, password) => {
  if (!email || !password) {
    return new Res(false, "input error", null);
  }
  const registeredUser = db.users.find((el) => el.email == email);
  if (!registeredUser) {
    return new Res(false, "this user doesn't exist", null);
  } else {
    if (checkPasswords(password, registeredUser.password)) {
      return new Res(true, "successfully logged in", registeredUser);
    } else {
      return new Res(false, "password incorrect", null);
    }
  }
};

module.exports = { signup, signin };
