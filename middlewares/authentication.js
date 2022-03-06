const UserController = require("../controllers/userController");
const { convertTokenToPayload } = require("../helpers/jwt");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers; //access token
    // let access_token = token;
    const payload = convertTokenToPayload(access_token);

    // console.log(req.headers, "ini req header");

    //query user base on payload
    const user = await User.findByPk(payload.id);
    // console.log(user, "ini apa");
    if (!user) {
      throw { name: "JsonWebTokenError" };
    }

    //additional data
    req.loginUser = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
