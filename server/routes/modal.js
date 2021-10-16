const express = require("express");
const modalRouter = express.Router();
const Controller = require("../controllers/modalController");

modalRouter.post("/modal", Controller.addModalCash);

module.exports = modalRouter;
