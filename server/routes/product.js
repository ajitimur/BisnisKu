const express = require("express");
const ProductController = require("../controllers/productController");
const productRouter = express.Router();

productRouter.get("/all", ProductController.getAllProduct)

module.exports = productRouter