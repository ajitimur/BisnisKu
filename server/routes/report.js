const express = require("express");
const ReportController = require("../controllers/reportController");
const reportRouter = express.Router();

reportRouter.get("/labaRugi", ReportController.labaRugi)
reportRouter.get("/labaRugiBulanan", ReportController.labaRugiBulanan)
reportRouter.get("/saldo", ReportController.getSaldo)

module.exports = reportRouter