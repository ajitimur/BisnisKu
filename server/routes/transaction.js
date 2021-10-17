const express = require("express");
const TransactionController = require("../controllers/transactionController");
const transactionRouter = express.Router();

transactionRouter.get("/unpaid", TransactionController.allUnpaid)
transactionRouter.get("/paid", TransactionController.allPaid)


module.exports = transactionRouter