"use strict";

var mysql = require("mysql");

class StatDao {

    constructor(pool) {
        this.pool = pool;
    }
    
      victories(callback) {
        this.pool.query(`
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
        this.pool.query(`
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
        this.pool.query(`
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