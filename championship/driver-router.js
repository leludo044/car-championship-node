
var express = require('express');
var router = express.Router();

var dao ;

router.get('/', function (request, response) {
    dao.findAll(function (drivers) {
        response.json(drivers);
    });
});

router.get('/:id', function (request, response) {
    dao.find(request.params.id, function (error, driver) {
        if (!error) {
            response.json(driver);
        } else {
            response.status(404).json({ "message": error });
        }
    });
});

router.post('/', function (request, response) {
    console.log(request.body);
    dao.create(request.body, function (err, insertedId) {
        if (err) {
            response.status(409).json({ "message": err });
        } else {
            response.status(201).end();
        }
    });
});

router.put('/', function (request, response) {
    console.log(request.body);
    dao.update(request.body, function (err, insertedId) {
        if (err) {
            response.status(404).json({ "message": err });
        } else {
            response.end();
        }
    });
});

router.delete('/:id', function (request, response) {
    dao.delete(request.params.id, function (err, affectdRows) {
        if (err) {
            response.status(404).json({ "message": err });
        } else {
            response.end();
        }
    })
});

module.exports = router;
module.exports.dao = function(driverDao) {
    dao = driverDao;
}
