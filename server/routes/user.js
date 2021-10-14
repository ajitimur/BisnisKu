const express = require("express");
const userRouter = express.Router();
const Controller = require("../controllers/userController");

userRouter.post("/login", Controller.login);
userRouter.post("/register", Controller.register);

module.exports = userRouter;
