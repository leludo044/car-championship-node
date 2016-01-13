var express = require('express');
var bodyParser = require('body-parser');
var process = require("process");

var Dao = require('./dao');
var DbConnector = require("./dbconnector");
var championshipRouter = require("./championship-router");

var connector = new DbConnector();
connector.parse(process.env.GTRCHAMP_DATABASE);
console.log(connector);

var dao = new Dao(connector);
championshipRouter.dao(dao);

var app = express();
app.use(bodyParser.json());
app.use('/', championshipRouter);
app.listen(3000);