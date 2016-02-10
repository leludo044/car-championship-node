"use strict";

var express = require('express');
var DefaultRouter = require('../default-router');
var DriverValidator = require('./driver-validator');


class DriverRouter extends DefaultRouter {
    constructor(specificDao) {
        super(specificDao);
        this.setValidator(new DriverValidator()) ;
        let self = this;

        this.getRouter().get('/:id/hasrun', function (request, response) {
            self.dao.hasRun(request.params.id, function (error, runCount) {
                if (!error) {
                    response.json(runCount);
                } else {
                    response.status(404).json({ "message": error });
                }
            });
        });
    }

}

module.exports = DriverRouter;
