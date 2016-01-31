"use strict";

var express = require('express');

class StatRouter {
    constructor(specificDao) {
        this.dao = specificDao;
        this.router = express.Router();
        let self = this;

        this.router.get('/victory', function (request, response) {
            self.dao.victories(function (stats) {
                   response.json(stats);
            });
        });        

        this.router.get('/pole', function (request, response) {
            self.dao.poles(function (stats) {
                   response.json(stats);
            });
        });        

        this.router.get('/podium', function (request, response) {
            self.dao.podiums(function (stats) {
                   response.json(stats);
            });
        });        
    }

    getRouter() {
        return this.router ;
    }
}

module.exports = StatRouter;
