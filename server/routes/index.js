const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
const penjualanRouter = require("./penjualan");
const productRouter = require("./product");
const mainRouter = express.Router();
const user = require("./user");
const pembelian = require("./pembelian");
const modal = require("./modal");
const { adminAuthentication } = require(`../middlewares/authentication`);
const pengeluaranRouter = require("./pengeluaran");


mainRouter.use("/user", user);
mainRouter.use(adminAuthentication);
mainRouter.use("/modal", modal);
mainRouter.use("/pembelian", pembelian);
mainRouter.use("/pengeluaran", pengeluaranRouter)
mainRouter.use("/penjualan", penjualanRouter);
mainRouter.use("/product", productRouter);

mainRouter.use(errorHandler);

module.exports = mainRouter;
