var express = require('express');
var bodyParser = require('body-parser');
var process = require("process");

var ChampionshipDao = require('./championship-dao');
var DriverDao = require('./driver-dao');
var TrackDao = require('./track-dao');
var CountryDao = require('./country-dao'); 
var DbConnector = require("./dbconnector");
var championshipRouter = require("./default-router");
var driverRouter = require("./default-router");
var trackRouter = require("./default-router");
var countryRouter = require("./default-router");

var connector = new DbConnector();
connector.parse(process.env.GTRCHAMP_DATABASE);
console.log(connector);

var dao = new ChampionshipDao(connector);
championshipRouter.dao(dao);

var driverDao = new DriverDao(connector);
driverRouter.dao(driverDao);

var trackDao = new TrackDao(connector);
trackRouter.dao(trackDao);

var countryDao = new CountryDao(connector, "pays", "Pays");
countryRouter.dao(countryDao);

var app = express();
app.use(bodyParser.json());
app.use('/championship', championshipRouter);
app.use('/driver', driverRouter);
app.use('/track', trackRouter);
app.use('/country', countryRouter);
app.listen(3000);