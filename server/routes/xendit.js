const express = require("express");
const { PembayaranPiutangController } = require("../controllers/pembayaranPiutang.js");
const xenditRouter = express.Router();

xenditRouter.post("/success", PembayaranPiutangController.debtPayment)

module.exports = xenditRouter