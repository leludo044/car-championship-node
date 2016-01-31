var express = require('express');
var bodyParser = require('body-parser');
var process = require("process");

var DbConnector = require("./dbconnector");

var ChampionshipDao = require('./championship/championship-dao');
var DriverDao = require('./driver/driver-dao');
var TrackDao = require('./track/track-dao');
var CountryDao = require('./country/country-dao'); 
var StatDao = require('./stat/stat-dao');

var DefaultRouter = require('./default-router');
var ChampionshipRouter = require('./championship/championship-router');
var DriverRouter = require('./driver/driver-router');
var TrackRouter = require('./track/track-router');
var StatRouter = require('./stat/stat-router');

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

var statDao = new StatDao(connector);
var statRouter = new StatRouter(statDao);

var app = express();
app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use('/api/championship', championshipRouter.getRouter());
app.use('/api/driver', driverRouter.getRouter());
app.use('/api/track', trackRouter.getRouter());
app.use('/api/country', countryRouter.getRouter());
app.use('/api/stat', statRouter.getRouter());

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});