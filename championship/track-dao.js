"use strict";

var mysql = require("mysql");
var util = require("util");
var DefaultDao = require('./default-dao');

class TrackDao extends DefaultDao {

    constructor(dbConnector) {
        super(dbConnector, 'circuits', 'Track');
        this.updateStategy = ["nom", "longueur", "idPays"];
    }
    
    wasRun(id, callback) {
        if (this.checkId(id)) {
            this.connection.query('select count(*) as count from resultats where idGrandPrix=?', id,
                function (err, rows, fields) {
                    console.log(err);
                    console.log(rows);
                    console.log(fields);
                    if (!err) {
                        callback(error, rows[0]);
                    } else {
                        console.log('Error while performing Query : ' + err);
                    }
                });
        } else {
            var error = "Bad id format !";
            callback(error, {});
        }
    };

}

module.exports = TrackDao;