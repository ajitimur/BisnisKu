const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
const penjualanRouter = require("./penjualan");
const productRouter = require("./product");
const mainRouter = express.Router();
const user = require("./user");
const pembelian = require("./pembelian");
const modal = require("./modal");
const { adminAuthentication } = require(`../middlewares/authentication`);


mainRouter.use("/", user);
mainRouter.use(adminAuthentication);
mainRouter.use("/", modal);
mainRouter.use("/", pembelian);

mainRouter.use(errorHandler);

module.exports = mainRouter;
