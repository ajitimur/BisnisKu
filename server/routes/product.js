const express = require("express");
const ProductController = require("../controllers/productController");
const productRouter = express.Router();

productRouter.get("/all", ProductController.getAllProduct)
productRouter.get("/:id", ProductController.getOneProduct)

module.exports = productRouter