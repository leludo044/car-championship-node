"use strict";

var mysql = require("mysql");
var util = require("util");
var DefaultDao = require('./default-dao');

class ChampionshipDao extends DefaultDao {

    constructor(dbConnector) {
        super(dbConnector, 'championnats', 'Championship');
    }

    update(championship, callback) {
        this.connection.query('update championnats set libelle=? where id=?', [championship.libelle, championship.id],
            function (err, result) {
                if (!err) {
                    if (result.affectedRows == 0) {
                        err = "Championship #" + championship.id + " not updated !";
                    }
                }
                callback(err, result.affectedRows);
            });
    };
}

module.exports = ChampionshipDao;