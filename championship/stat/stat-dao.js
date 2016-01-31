"use strict";

var mysql = require("mysql");

class StatDao {

    constructor(dbConnector) {
        this.connect(dbConnector);
    }

    connect(dbConnector) {
        this.connection = mysql.createConnection({
            host: dbConnector.hostname,
            user: dbConnector.username,
            password: dbConnector.password,
            database: dbConnector.database
        });
        this.connection.connect();
    };

    close() {
        this.connection.end();
    }
    
      victories(callback) {
        this.connection.query(`
select pilotes.nom as name, sum(!isnull(resultats.place)) as count 
from pilotes 
left join resultats on pilotes.id = resultats.idPilote and resultats.place=1 
group by pilotes.nom order by count desc
`, 
            function (err, rows, fields) {
                if (!err) {
                    callback(rows);
                } else {
                    console.log('Error while performing Query : ' + err);
                }
            });
    };

      poles(callback) {
        this.connection.query(`
select pilotes.nom as name, sum(!isnull(resultats.place)) as count 
from pilotes 
left join resultats on pilotes.id = resultats.idPilote and resultats.grille=1 
group by pilotes.nom order by count desc
`, 
            function (err, rows, fields) {
                if (!err) {
                    callback(rows);
                } else {
                    console.log('Error while performing Query : ' + err);
                }
            });
    };
    
     podiums(callback) {
        this.connection.query(`
select pilotes.nom as name, sum(!isnull(resultats.place)) as count 
from pilotes 
left join resultats on pilotes.id = resultats.idPilote and resultats.place >=1 and resultats.place <=3 
group by pilotes.nom order by count desc
`, 
            function (err, rows, fields) {
                if (!err) {
                    callback(rows);
                } else {
                    console.log('Error while performing Query : ' + err);
                }
            });
    };

}

module.exports = StatDao;