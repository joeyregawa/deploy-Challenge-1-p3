const { Category, User, Product, Image } = require("../models");

class pubController {

  static product = async (req, res, next) => {
    try {
      // console.log("ini dari /products", req.loginUser);
      const product = await Product.findAll({
        include: [{model: User, attributes: {exclude : ["password","email","address","phoneNumber","role","createdAt","updatedAt"]}},{model: Category},{model: Image}],
        order: [["id", "ASC"]],
      });
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  };

  static pubsproductById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const findtargetId = await Product.findByPk(+id);
      if (findtargetId) {
        const findProduct = await Product.findOne({
          where: {
            id: +id,
          },
          include: [{model: User, attributes: {exclude : ["password","email","address","phoneNumber","role","createdAt","updatedAt"]}},{model: Category},{model: Image}],
        });
        res.status(200).json(findProduct);
      } else {
        throw {
          code: 404,
          name: "notFound",
          message: "Product not Found",
        };
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = pubController