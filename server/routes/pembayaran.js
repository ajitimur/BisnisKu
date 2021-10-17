const express = require("express");
const { PembayaranPiutangController } = require("../controllers/pembayaranPiutang.js");
const pembayaranRouter = express.Router();

pembayaranRouter.post("/:id", PembayaranPiutangController.sendInvoice) //TransactionId
pembayaranRouter.post("/success", PembayaranPiutangController.debtPayment)

module.exports = pembayaranRouter