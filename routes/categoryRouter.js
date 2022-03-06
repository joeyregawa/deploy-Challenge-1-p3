const express = require("express");
const CategoryController = require("../controllers/categoryController");
const router = express.Router();

router.get("/", CategoryController.allCategories);
router.post("/", CategoryController.newCategory);
router.delete("/:id", CategoryController.delete);

module.exports = router;