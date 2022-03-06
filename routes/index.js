const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const categoryRouters = require("./categoryRouter");
const productRouters = require("./productRouter");
const authentication = require("../middlewares/authentication");
const pubCustomerRouter = require("./pubRouter");

router.get("/", (req, res) => {
  res.send("hello world");
});
router.use("/users", userRouter);
router.use("/pubs",pubCustomerRouter)
router.use(authentication);
router.use("/categories", categoryRouters);
router.use("/products", productRouters);


module.exports = router;