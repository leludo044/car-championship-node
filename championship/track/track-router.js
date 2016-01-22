"use strict";

var express = require('express');
var DefaultRouter = require('../default-router');


class TrackRouter extends DefaultRouter {
    constructor(specificDao) {
        super(specificDao);
        let self = this;

        this.getRouter().get('/:id/wasrun', function (request, response) {
            self.dao.wasRun(request.params.id, function (error, runCount) {
                if (!error) {
                    response.json(runCount);
                } else {
                    response.status(404).json({ "message": error });
                }
            });
        });
    }

}

module.exports = TrackRouter;
