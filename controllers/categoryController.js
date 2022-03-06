const { Category, User, Product, Image } = require("../models");

class CategoryController {
  static allCategories = async (req, res, next) => {
    try {
      const allCategory = await Category.findAll();
      res.status(200).json(allCategory);
    } catch (err) {
      next(err);
      // res.status(500).json(err);
    }
  };
  static newCategory = async (req, res, next) => {
    try {
      const { name } = req.body;
      const category = await Category.create({ name });
      res.status(201).json(category);
    } catch (err) {
      console.log(err)
      next(err);
    }
  };
  static delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const findDeleteProduct = await Category.findByPk(+id);
      if (findDeleteProduct) {
        const result = await Category.destroy({
          where: { id: +id },
        });
        res
          .status(200)
          .json({ message: `Category with Id ${id} has been deleted` });
      } else {
        throw {
          code: 404,
          name: "notFound",
          message: "Category not Found",
        };
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

module.exports = CategoryController;