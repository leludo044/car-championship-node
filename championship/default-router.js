
var express = require('express');
var router = express.Router();

var dao ;

router.get('/', function (request, response) {
    dao.findAll(function (championships) {
        response.json(championships);
    });
});

router.get('/:id', function (request, response) {
    dao.find(request.params.id, function (error, championship) {
        if (!error) {
            response.json(championship);
        } else {
            response.status(404).json({ "message": error });
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
module.exports.dao = function(specificDao) {
    dao = specificDao;
}
