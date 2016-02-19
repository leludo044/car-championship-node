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

    cancelRace(championshipId, trackId, callback) {
        let self = this ;

        this.connection.query('delete from grandsprix where idChampionnat=? and idCircuit=?', [championshipId, trackId],
            function (err, result) {
                if (!err) {
                    if (result.affectedRows == 0) {
                        err = 'Race not cancelled !';
                    }
                }
                callback(err, result.affectedRows);
            });
    };

    
    findRaces(championshipId, callback) {
        this.connection.query(`
select grandsprix.id, circuits.id idCircuit, circuits.nom, circuits.longueur, grandsprix.date, pays.nom pays from grandsprix
inner join championnats on championnats.id = grandsprix.idChampionnat
join circuits on circuits.id = grandsprix.idCircuit
join pays on pays.id = circuits.idPays
where championnats.id = ?
order by grandsprix.date asc
        `, championshipId, 
            function (err, rows, fields) {
                if (!err) {
                    callback(rows);
                } else {
                    console.log('Error while performing Query : ' + err);
                }
            });
    };
    
    rank(championshipId, callback) {
        this.connection.query(`
select pilotes.nom, sum(points.points) points 
from resultats 
inner join grandsprix on resultats.idGrandPrix = grandsprix.id
inner join championnats on championnats.id = grandsprix.idChampionnat
inner join pilotes on pilotes.id = resultats.idPilote
inner join points on points.place = resultats.place
where championnats.id = ?
and championnats.type = points.type
group by pilotes.nom
order by points desc`
, championshipId, 
            function (err, rows, fields) {
                if (!err) {
                    callback(rows);
                } else {
                    console.log('Error while performing Query : ' + err);
                }
            });        
    }
    
    findResults(raceId, callback) {
        this.connection.query(`
select pilotes.id idPilote, pilotes.nom, resultats.grille depart, resultats.place arrivee, resultats.numCourse, points.points points 
from resultats 
inner join grandsprix on resultats.idGrandPrix = grandsprix.id
inner join championnats on championnats.id = grandsprix.idChampionnat
inner join pilotes on pilotes.id = resultats.idPilote
inner join points on points.place = resultats.place
where grandsprix.id = ?
and championnats.type = points.type
group by pilotes.id, pilotes.nom, resultats.place, depart, resultats.numCourse
order by numCourse asc, points desc`
, raceId, 
            function (err, rows, fields) {
                if (!err) {
                    callback(rows);
                } else {
                    console.log('Error while performing Query : ' + err);
                }
            });
    };
    
    findRaceCount(id, callback) {
        if (this.checkId(id)) {
            this.connection.query('select count(*) as count from grandsprix where idChampionnat=?', id,
                function (err, rows) {
                    if (!err) {
                        console.log(rows);
                        callback(error,  rows[0].count );
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

module.exports = ChampionshipDao;