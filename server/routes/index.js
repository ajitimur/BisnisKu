const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
const mainRouter = express.Router();
const user = require("./user");

mainRouter.use("/", user);
mainRouter.use(errorHandler);

module.exports = mainRouter;
