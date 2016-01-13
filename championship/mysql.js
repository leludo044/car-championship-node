'use strict';

var dao = require("./dao");
var DbConnector = require("./dbconnector");

var connector = new DbConnector();
connector.parse('mysql://root:root@localhost/gtrchamp?reconnect=true');
console.log(connector);


dao.connect(connector) ;

dao.findAll(function (championships) {
    console.log(championships);
});

dao.find(1, function (err, championship) {
    if (err) {
        console.log(err);
    } else {
        console.log(championship);
    }
});


dao.create({id:3, libelle:"toto"}, function(err, insertedId) {
    console.log("Create "+insertedId);
})
dao.findAll(function (championships) {
    console.log(championships);
});
dao.update({id:3, libelle:"titi"}, function(err, affectdRows) {
    console.log("Update " + affectdRows);
})
dao.findAll(function (championships) {
    console.log(championships);
});
dao.delete(3, function(err, affectdRows) {
    console.log("Delete " + affectdRows);
})
dao.findAll(function (championships) {
    console.log(championships);
});

dao.close();