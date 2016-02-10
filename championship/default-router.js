"use strict";

var express = require('express');


class DefaultRouter {
    constructor(specificDao) {
        this.router = express.Router();
        this.dao = specificDao;
        this.validator = { validate: function(entity) {return true}};
        let self = this;

        this.router.get('/', function (request, response) {
            self.dao.findAll(function (championships) {
                response.json(championships);
            });
        });

        this.router.get('/:id', function (request, response) {
            self.dao.find(request.params.id, function (error, championship) {
                if (!error) {
                    response.json(championship);
                } else {
                    response.status(404).json({ "message": error });
                }
            });
        });

        this.router.put('/', function (request, response) {
            console.log(request.body);
            self.dao.update(request.body, function (err, insertedId) {
                if (err) {
                    response.status(404).json({ "message": err });
                } else {
                    response.end();
                }
            });
        });

        this.router.post('/', function (request, response) {
            console.log(request.body);
            if (self.validator.validate(request.body)) {
                self.dao.create(request.body, function (err, insertedId) {
                    if (err) {
                        response.status(409).json({ "message": err });
                    } else {
                        response.status(201).end();
                    }
                });
            }
        });

        this.router.delete('/:id', function (request, response) {
            self.dao.delete(request.params.id, function (err, affectdRows) {
                if (err) {
                    response.status(404).json({ "message": err });
                } else {
                    response.end();
                }
            })
        });
    }

    getRouter() {
        return this.router;
    }
    
    setValidator(validator) {
        this.validator = validator;
    }
}

module.exports = DefaultRouter;
