const { generateToken } = require("../helpers/jwt");
const { Category, User, Product, Image } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");

class UserController {
  static register = async (req, res, next) => {
    try {
      // console.log(req.body);
      const { username, email, password, phoneNumber, address } = req.body;
      console.log(req.body);
      const userRegister = await User.create({
        username,
        email,
        password,
        role: "Admin",
        phoneNumber,
        address,
      });

      const payload = {
        id: userRegister.id,
        email: userRegister.email,
        role: userRegister.role,
      };

      res.status(201).json({
        access_token: generateToken(payload),
        username: userRegister.username,
        email: userRegister.email,
        role: userRegister.role,
      });
    } catch (err) {
      console.log(err)
      next(err); // move to error handler
    }
  };

  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // console.log(req.body);
      const user = await User.findOne({
        where: {
          email,
        },
      });
      // console.log(user);
      if (user) {
        const isValidPassword = comparePassword(password, user.password);
        if (isValidPassword) {
          const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
          };
          res.status(200).json({
            message: "Login Successfull",
            access_token: generateToken(payload),
            role: user.role,
            authorId: user.id,
            username: user.username,
          });
        } else {
          throw {
            code: 401,
            name: "unauthorized",
            message: "Invalid Email or Password",
          };
        }
      } else {
        throw {
          code: 401,
          name: "unauthorized",
          message: "Invalid Email or Password",
        };
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = UserController;
