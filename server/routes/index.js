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
const reportRouter = require("./report");
const pembayaranRouter = require("./pembayaran");
const transactionRouter = require("./transaction");
const customerRouter = require("./customer");


mainRouter.use("/user", user);
mainRouter.use(adminAuthentication);
mainRouter.use("/pembayaran", pembayaranRouter);
mainRouter.use("/modal", modal);
mainRouter.use("/pembelian", pembelian);
mainRouter.use("/pengeluaran", pengeluaranRouter)
mainRouter.use("/penjualan", penjualanRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/reports", reportRouter);
mainRouter.use("/transaction", transactionRouter)

mainRouter.use("/customer", customerRouter)

mainRouter.use(errorHandler);

module.exports = mainRouter;
