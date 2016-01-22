"use strict";

var express = require('express');
var DefaultRouter = require('../default-router');


class ChampionshipRouter extends DefaultRouter {
    constructor(specificDao) {
        super(specificDao);
        let self = this;

        this.getRouter().get('/:id/race', function (request, response) {
            self.dao.findRaces(request.params.id, function (races) {
                   response.json(races);
            });
        });
        
        this.getRouter().get('/:id/run/:trackId', function (request, response) {
            self.dao.organizeRace(request.params.id, request.params.trackId, function (err, affectedRows) {
                   response.json(affectedRows);
            });
        });
    }

}

module.exports = ChampionshipRouter;
