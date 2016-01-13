var express = require('express');
var bodyParser = require('body-parser');
var process = require("process");

var dao = require('./dao');
var DbConnector = require("./dbconnector");

var connector = new DbConnector();
connector.parse(process.env.GTRCHAMP_DATABASE);
console.log(connector);
dao.connect(connector);


var app = express() ; 

app.use(bodyParser.json());

app.get('/championships', function(request, response) {
		dao.findAll(function (championships) {
			response.json(championships);
		});
	}); 
	
app.get('/championships/:id', function(request, response) {
		dao.find(request.params.id, function (error, championship) {
			if (!error) {
                response.json(championship);
			} else {
                response.status(404).json({ "message": error });
			}
		});
	});

app.put('/championships', function(request, response) {
    console.log(request.body);
    dao.update(request.body, function(err, insertedId){
        console.log(insertedId);
    });
    response.end() ;
});

app.post('/championships', function(request, response) {
    console.log(request.body);
    dao.create(request.body, function(err, insertedId){
        console.log(insertedId);
    });
    response.end() ;
});

app.delete('/championships/:id', function(request, response) {
    dao.delete(request.params.id, function(err, affectdRows) {
        console.log(affectdRows);
    })    
    response.end() ;
});

app.listen(3000);