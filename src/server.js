require('dotenv').config();
<<<<<<< HEAD
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
=======

const express = require("express");
const configViewEngine = require("./config/viewEngine");
const initWebRoutes = require("./routes/web");
const bodyParser = require("body-parser");
>>>>>>> 2221c31f22d3e7512d0f37502adc7f6667ddc30b

let app = express();

//config body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config view engine
configViewEngine(app);

//config web routes
initWebRoutes(app);

let port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Messenger bot is running at the port ${port}`);
});
