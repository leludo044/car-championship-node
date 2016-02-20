"use strict";

var mysql = require("mysql");
var util = require("util");
var DefaultDao = require('../default-dao');

class DriverDao extends DefaultDao {

    constructor(pool) {
        super(pool, 'pilotes', 'Driver');
        this.updateStategy = ["nom"];
    }

    hasRun(id, callback) {
        if (this.checkId(id)) {
            this.pool.query('select count(*) as count from resultats where idPilote=?', id,
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

module.exports = DriverDao;