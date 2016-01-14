"use strict";

var mysql = require("mysql");
var util = require("util");
var DefaultDao = require('./default-dao');

class DriverDao extends DefaultDao {

    constructor(dbConnector) {
        super(dbConnector, 'pilotes', 'Driver');
        this.set = ["nom"] ;
    }

    update(driver, callback) {
        this.connection.query('update pilotes set nom=? where id=?', [driver.nom, driver.id],
            function (err, result) {
                if (!err) {
                    if (result.affectedRows == 0) {
                        err = "Driver #" + driver.id + " not updated !";
                    }
                }
                callback(err, result.affectedRows);
            });
    };
}

module.exports = DriverDao;