const express = require("express");
const CustomerController = require("../controllers/customerController");
const customerRouter = express.Router();

customerRouter.get("/", CustomerController.findAll)
customerRouter.post("/", CustomerController.createCustomer)

module.exports = customerRouter