const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const TOKEN_SECRET = require("./config");

const newToken = (idUser) => {
  return jwt.sign({ id: idUser }, TOKEN_SECRET);
};

// just for information
const verifyToken = (token) => {
  try {
    jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return err;
      }
      return decoded;
    });
  } catch (error) {
    return error;
  }
};

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 8);
};

const checkPasswords = (password, passwordHash) => {
  return bcrypt.compareSync(password, passwordHash);
};

module.exports = { newToken, verifyToken, checkPasswords, hashPassword };
