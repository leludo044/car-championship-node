var express = require('express');
var bodyParser = require('body-parser');
var process = require("process");

var Dao = require('./championship-dao');
var DriverDao = require('./driver-dao');
var DbConnector = require("./dbconnector");
var championshipRouter = require("./championship-router");
var driverRouter = require("./driver-router");

var connector = new DbConnector();
connector.parse(process.env.GTRCHAMP_DATABASE);
console.log(connector);

var dao = new Dao(connector);
championshipRouter.dao(dao);

var driverDao = new DriverDao(connector);
driverRouter.dao(driverDao);

var app = express();
app.use(bodyParser.json());
app.use('/', championshipRouter);
app.use('/driver', driverRouter);
app.listen(3000);