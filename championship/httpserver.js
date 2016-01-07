var http = require('http');
var url = require('url');
var dao = require('./dao');

function dealWithWebRequest(request, response) {
	console.log(url.parse(request.url));
	if (request.url == '/championships') {
		response.writeHead(200, { "Content-Type": "application/json" });
		dao.findAll(function (championships) {
			response.write(JSON.stringify(championships));
			response.end();
		});
	} else if (request.url == '/championships/1') {
		dao.find(3, function (err, championship) {
			if (!err) {
				response.writeHead(200, { "Content-Type": "application/json" });
				response.write(JSON.stringify(championship));
				response.end();
			} else {
				response.writeHead(404, { "Content-Type": "application/json" });
				response.write(JSON.stringify({ "message": err }));
				response.end();
			}
		});
	}
	else {
		response.writeHead(404, { "Content-Type": "application/json" });
		response.write(JSON.stringify({ "message": "Bad URL !" }));
		response.end();
	}
}

var webserver = http.createServer(dealWithWebRequest).listen(8124, "127.0.0.1");
webserver.once('listening', function () {
	console.log('Server running at http://127.0.0.1:8124');
});