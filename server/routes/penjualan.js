const express = require("express");
const PenjualanController = require("../controllers/penjualanController");
const penjualanRouter = express.Router();

penjualanRouter.post("/cash", PenjualanController.penjualanCash) //ini bisa kas atau bank
penjualanRouter.post("/piutang", PenjualanController.penjualanPiutang)

module.exports = penjualanRouter;