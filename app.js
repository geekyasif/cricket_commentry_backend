const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes/index");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/cricket");

app.use("/api", routes);

module.exports = app;
