const express = require("express");
const PengeluaranController = require("../controllers/pengeluaranController");
const pengeluaranRouter = express.Router();

pengeluaranRouter.post(`/cash`, PengeluaranController.spendCash);
pengeluaranRouter.post(`/bank`, PengeluaranController.spendBank);

module.exports = pengeluaranRouter;
