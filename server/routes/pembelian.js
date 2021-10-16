const express = require("express");
const pembelianRouter = express.Router();
const Controller = require("../controllers/pembelianController");

pembelianRouter.post("/buy-cash", Controller.pembelianCash);
pembelianRouter.post("/buy-credit", Controller.pembelianCash);

module.exports = pembelianRouter;
