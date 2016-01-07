var express = require('express');
var bodyParser = require('body-parser');
var dao = require('./dao');

var app = express() ; 

app.use(bodyParser.json());

app.get('/championships', function(request, response) {
		response.setHeader('Content-Type', 'application/json');
		dao.findAll(function (championships) {
			response.send(JSON.stringify(championships));
		});
	}); 
	
app.get('/championships/:id', function(request, response) {
		dao.find(request.params.id, function (error, championship) {
			if (!error) {
				response.writeHead(200, { "Content-Type": "application/json" });
				response.write(JSON.stringify(championship));
				response.end();
			} else {
				response.writeHead(404, { "Content-Type": "application/json" });
				response.write(JSON.stringify({ "message": error }));
				response.end();
			}
		});
	});

app.post('/championships', function(request, response) {
    console.log(request.body);
    dao.save(request.body, function(err, insertedId){
        console.log(insertedId);
    });
    response.end() ;
});

app.listen(3000);