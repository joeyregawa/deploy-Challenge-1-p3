const { Category, User, Product, Image } = require("../models");
const {sequelize} = require("../models")

class ProductController {
  static allProduct = async (req, res, next) => {
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

  static newProduct = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      let { name, description, price, mainImg, categoryId,imgUrl1,imgUrl2,
        imgUrl3 } = req.body;
      // console.log(imgUrl)
      console.log(req.body);
      let authorId = req.loginUser.id;
      let username = req.loginUser.username;
      // req.loginUser.id;
      const product = await Product.create({
        name,
        description,
        price,
        mainImg,
        categoryId,
        authorId,
      },{ transaction: t });

      let productId = product.id
      const image = await Image.bulkCreate([
        {productId, imgUrl: imgUrl1},
        {productId, imgUrl: imgUrl2},
        {productId, imgUrl: imgUrl3},
      ],{ transaction: t })

      // imgUrl = imgUrl.forEach(async element => {
      //   await Image.create({
      //     productId: product.id,
      //     imgUrl: element
      //   })
      // });
      await t.commit()
      res.status(201).json({message : "Success Create a Product"});
    } catch (err) {
      console.log(err)
      await t.rollback()
      next(err);
    }
  };

  static productById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const findtargetId = await Product.findByPk(+id);
      if (findtargetId) {
        const findProduct = await Product.findOne({
          where: {
            id: +id,
          },
          include: [{model: User, attributes: ["username"]},{model: Category},{model: Image}],
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

  static editById = async (req, res, next) => {
    try {
      let { name, description, price, mainImg, categoryId,imgUrl  } = req.body;
      // console.log(req.body, "<<<<<<<<<<<<<<<"); //take out author id
      const { id } = req.params;
      let username = req.loginUser.username;

      const findProduct = await Product.findByPk(id); //findproduct
      // console.log(findProduct, " ini dari find by PK <<<<<<<<<<<<<<<<<<<");
      if (findProduct) {
        const result = await Product.update(
          { name, description, price, mainImg, categoryId },
          {
            where: {
              id,
            },
            returning: true,
          }
        );
        // imgUrl = imgUrl.forEach(async element => {
        //   await Image.update(
        //     {imgUrl: element},
        //     {where : {
        //       productId: id
        //     }}
        //   )
        // });
        res.status(200).json({message : `Success Update a Product`});
      } else {
        throw {
          code: 404,
          name: "notFound",
          message: "Product not Found",
        };
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const findDeleteProduct = await Product.findByPk(+id);
      if (findDeleteProduct) {
        const result = await Product.destroy({
          where: { id: +id },
        });
        res
          .status(200)
          .json({ message: `Product with Id ${id} has been deleted` });
      } else {
        throw {
          code: 404,
          name: "notFound",
          message: "Product not Found",
        };
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

module.exports = ProductController;