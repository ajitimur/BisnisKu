const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
const penjualanRouter = require("./penjualan");
const mainRouter = express.Router();
const user = require("./user");

mainRouter.use("/users", user);
mainRouter.use("/penjualan", penjualanRouter);
mainRouter.use(errorHandler);

module.exports = mainRouter;
