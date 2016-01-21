var express = require('express');
var bodyParser = require('body-parser');
var process = require("process");

var DbConnector = require("./dbconnector");

var ChampionshipDao = require('./championship-dao');
var DriverDao = require('./driver-dao');
var TrackDao = require('./track-dao');
var CountryDao = require('./country-dao'); 

var DefaultRouter = require("./default-router");

var connector = new DbConnector();
connector.parse(process.env.GTRCHAMP_DATABASE);
console.log(connector);

var dao = new ChampionshipDao(connector);
var championshipRouter = new DefaultRouter(dao);
/*
championshipRouter.get('/wasrun/:id', function (request, response) {
    dao.wasRun(request.params.id, function (error, championship) {
        if (!error) {
            response.json(championship);
        } else {
            response.status(404).json({ "message": error });
        }
    });
});
*/

var driverDao = new DriverDao(connector);
var driverRouter = new DefaultRouter(driverDao);

var trackDao = new TrackDao(connector);
var trackRouter = new DefaultRouter(trackDao);

var countryDao = new CountryDao(connector, "pays", "Pays");
var countryRouter = new DefaultRouter(countryDao);

var app = express();
app.use(bodyParser.json());
app.use('/championship', championshipRouter.getRouter());
app.use('/driver', driverRouter.getRouter());
app.use('/track', trackRouter.getRouter());
app.use('/country', countryRouter.getRouter());
app.listen(3000);