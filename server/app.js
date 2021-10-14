require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const router = require("./routes/index.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
