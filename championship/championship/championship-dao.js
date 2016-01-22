"use strict";

var mysql = require("mysql");
var util = require("util");
var DefaultDao = require('../default-dao');

class ChampionshipDao extends DefaultDao {

    constructor(dbConnector) {
        super(dbConnector, 'championnats', 'Championship');
        this.updateStategy = ["libelle"];
    }
    
    organizeRace(championshipId, trackId, callback) {
        let self = this ;

        this.connection.query('insert into grandsprix set idChampionnat=?, idCircuit=?', [championshipId, trackId],
            function (err, result) {
                if (!err) {
                    if (result.affectedRows == 0) {
                        err = 'Race not saved !';
                    }
                }
                callback(err, result.affectedRows);
            });
    };
    
    findRaces(championshipId, callback) {
        this.connection.query('select * from grandsprix where idChampionnat=?', championshipId, 
            function (err, rows, fields) {
                if (!err) {
                    callback(rows);
                } else {
                    console.log('Error while performing Query : ' + err);
                }
            });
    };
}

module.exports = ChampionshipDao;