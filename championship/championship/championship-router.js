"use strict";

var express = require('express');
var DefaultRouter = require('../default-router');


class ChampionshipRouter extends DefaultRouter {
    constructor(specificDao) {
        super(specificDao);
        let self = this;

        this.getRouter().get('/:id/tracks', function (request, response) {
            self.dao.findRaces(request.params.id, function (races) {
                   response.json(races);
            });
        });
        
        this.getRouter().put('/:id/run/:trackId', function (request, response) {
            self.dao.organizeRace(request.params.id, request.params.trackId, function (err, affectedRows) {
                   response.json(affectedRows);
            });
        });

        this.getRouter().delete('/:id/run/:trackId', function (request, response) {
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
        
        this.getRouter().get('/:id/isstarted', function (request, response) {
            self.dao.findRaceCount(request.params.id, function (error, count) {
                if (!error) {
                    response.json({"isStarted": count>0});
                } else {
                    response.status(404).json({ "message": error });
                }
            });
        });

    }

}

module.exports = ChampionshipRouter;
