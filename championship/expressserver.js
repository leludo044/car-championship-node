var express = require('express');
var bodyParser = require('body-parser');
var process = require("process");

var DbConnector = require("./dbconnector");

var ChampionshipDao = require('./championship/championship-dao');
var DriverDao = require('./driver/driver-dao');
var TrackDao = require('./track/track-dao');
var CountryDao = require('./country/country-dao'); 

var DefaultRouter = require('./default-router');
var ChampionshipRouter = require('./championship/championship-router');
var DriverRouter = require('./driver/driver-router');
var TrackRouter = require('./track/track-router');

var connector = new DbConnector();
connector.parse(process.env.GTRCHAMP_DATABASE);
console.log(connector);

var dao = new ChampionshipDao(connector);
var championshipRouter = new ChampionshipRouter(dao);

var driverDao = new DriverDao(connector);
var driverRouter = new DriverRouter(driverDao);

var trackDao = new TrackDao(connector);
var trackRouter = new TrackRouter(trackDao);

var countryDao = new CountryDao(connector, "pays", "Pays");
var countryRouter = new DefaultRouter(countryDao);

var app = express();
app.use(bodyParser.json());
app.use('/championship', championshipRouter.getRouter());
app.use('/driver', driverRouter.getRouter());
app.use('/track', trackRouter.getRouter());
app.use('/country', countryRouter.getRouter());
app.listen(3000);