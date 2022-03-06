const express = require("express");
const ProductController = require("../controllers/productController");
// const {
//   authorization,
// } = require("../middlewares/authorization");

const productRouter = express.Router();

productRouter.get("/", ProductController.allProduct);
productRouter.post("/", ProductController.newProduct);
productRouter.get("/:id", ProductController.productById);
// productRouter.patch("/:id", statusAuthorization, ProductController.status);
productRouter.put("/:id", ProductController.editById);
productRouter.delete("/:id", ProductController.delete);

module.exports = productRouter;