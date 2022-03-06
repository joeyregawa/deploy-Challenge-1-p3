'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: "authorId" });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username has beed taken!",
      },
      validate: {
        notEmpty: {
          msg: "Please input Username!",
        },
      },
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email has beed taken!",
      },
      validate: {
        notEmpty: {
          msg: "Please input email",
        },
        isEmail: {
          msg: "Please input with Email format",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please input password",
        },
        len: {
          args: [5],
          msg: `Password cannot less than 5 `,
        },
      },
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password);
      },
    },
    modelName: 'User',
  });
  return User;
};