require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/index.js");
const cors = require("cors");
const {
	BusinessLogicController,
} = require("./controllers/businessLogicController");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.post("/debtPayment", BusinessLogicController.debtPayment);
app.post("/spending", BusinessLogicController.spendCash);
app.get("/getDebt", BusinessLogicController.debtList);

module.exports = app;
