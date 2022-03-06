const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  // harus di tambah waktu expired login?
}

const convertTokenToPayload = (access_token) => {
  return jwt.verify(access_token, SECRET_KEY);
};

module.exports = { generateToken, convertTokenToPayload };
