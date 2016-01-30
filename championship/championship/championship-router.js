"use strict";

var express = require('express');
var DefaultRouter = require('../default-router');


class ChampionshipRouter extends DefaultRouter {
    constructor(specificDao) {
        super(specificDao);
        let self = this;

        this.getRouter().get('/:id/grandprix/list', function (request, response) {
            self.dao.findRaces(request.params.id, function (races) {
                   response.json(races);
            });
        });
        
        this.getRouter().get('/:id/run/:trackId', function (request, response) {
            self.dao.organizeRace(request.params.id, request.params.trackId, function (err, affectedRows) {
                   response.json(affectedRows);
            });
        });
        
        this.getRouter().get('/:id/classement', function (request, response) {
            self.dao.rank(request.params.id, function(ranks) {
                response.json(ranks);
            })
        });

        this.getRouter().get('/grandprix/:id/resultat', function (request, response) {
            self.dao.findResults(request.params.id, function (results) {
                   response.json(results);
            });
        });
    }

}

module.exports = ChampionshipRouter;
