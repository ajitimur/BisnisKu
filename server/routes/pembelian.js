const express = require("express");
const pembelianRouter = express.Router();
const Controller = require("../controllers/pembelianController");

pembelianRouter.post("/cash", Controller.pembelianCash);
pembelianRouter.post("/bank", Controller.pembelianBank);
pembelianRouter.post("/hutang", Controller.pembelianHutang);

module.exports = pembelianRouter;
