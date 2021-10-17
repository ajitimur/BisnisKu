const express = require("express");
const ReportController = require("../controllers/reportController");
const reportRouter = express.Router();

reportRouter.get("/labaRugi", ReportController.labaRugi)
reportRouter.get("/neraca", ReportController.neracaSaldo)

module.exports = reportRouter