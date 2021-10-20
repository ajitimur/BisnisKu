const express = require("express");
const modalRouter = express.Router();
const Controller = require("../controllers/modalController");

modalRouter.post("/cash", Controller.addModalCash);
modalRouter.post("/bank", Controller.addModalBank);

module.exports = modalRouter;
