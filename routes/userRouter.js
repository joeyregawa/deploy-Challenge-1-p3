const express = require("express");
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

const userRouter = express.Router();

userRouter.post("/login", UserController.login);
userRouter.use(authentication)
userRouter.post("/register", UserController.register);

module.exports = userRouter;