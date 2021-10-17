const express = require("express");
const ProductController = require("../controllers/productController");
const productRouter = express.Router();

productRouter.get("/all", ProductController.getAllProduct)
productRouter.get("/product/:id", ProductController.getOneProduct)

module.exports = productRouter