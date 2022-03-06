const bcrypt = require("bcryptjs");

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(5);
  return bcrypt.hashSync(password, salt);
}

function comparePassword(plainPassword, hashPassword) {
  return bcrypt.compareSync(plainPassword, hashPassword);
}

module.exports = { hashPassword, comparePassword };
