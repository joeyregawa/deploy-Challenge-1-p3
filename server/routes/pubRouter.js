const express = require("express");
const pubController = require("../controllers/pubController");
const pubCustomerRouter = express.Router();

pubCustomerRouter.get("/product", pubController.product);
pubCustomerRouter.get("/product/:id", pubController.pubsproductById);

module.exports = pubCustomerRouter;