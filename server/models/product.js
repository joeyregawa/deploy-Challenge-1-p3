'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Image, { foreignKey: "productId" });
      Product.belongsTo(models.User, { foreignKey: "authorId" });
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please input name",
        },
      },
    },
    slug: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please input description",
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Please input price`,
        },
        min: {
          args: 10000,
          msg: `minimum 10000`,
        },
      },
    },
    mainImg:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: "Input must Url!",
        },
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Please input category id!",
        },
      },
    },
    authorId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Please input author id!",
        },
      },
    }
  }, {
    sequelize,
    hooks: {
      beforeValidate(product){
        product.slug = product.name.split(' ').join('-')
      }
    },
    modelName: 'Product',
  });
  return Product;
};