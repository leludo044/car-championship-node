'use strict';

var process = require("process");

var dao = require("./dao");
var DbConnector = require("./dbconnector");

console.log('GTRCHAMP_DATABASE=' + process.env.GTRCHAMP_DATABASE);

if (process.env.GTRCHAMP_DATABASE) {
    var connector = new DbConnector();
    connector.parse(process.env.GTRCHAMP_DATABASE);
    console.log(connector);


    dao.connect(connector);

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


    dao.create({ id: 3, libelle: "toto" }, function (err, insertedId) {
        console.log("Create " + insertedId);
    })
    dao.findAll(function (championships) {
        console.log(championships);
    });
    dao.update({ id: 3, libelle: "titi" }, function (err, affectdRows) {
        console.log("Update " + affectdRows);
    })
    dao.findAll(function (championships) {
        console.log(championships);
    });
    dao.delete(3, function (err, affectdRows) {
        console.log("Delete " + affectdRows);
    })
    dao.findAll(function (championships) {
        console.log(championships);
    });

    dao.close();
} else {
    console.log("Variable d'environnement GTRCHAMP_DATABASE non définie");
}