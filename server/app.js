require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/index.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

module.exports = app;
