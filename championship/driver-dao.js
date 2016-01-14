"use strict";

var mysql = require("mysql");
var util = require("util");

class DriverDao {

    constructor(dbConnector) {
        this.connect(dbConnector);
    }

    checkId(id) {
        let isValid = false;
        let targetId = id;
        if (util.isNumber(id)) {
            isValid = true;
        } else {
            targetId = Number(id);
            if (!isNaN(targetId)) {
                isValid = true;
            }
        }
        return isValid;
    };

    connect(dbConnector) {
        this.connection = mysql.createConnection({
            host: dbConnector.hostname,
            user: dbConnector.username,
            password: dbConnector.password,
            database: dbConnector.database
        });
        this.connection.connect();
    };


    findAll(callback) {
        this.connection.query('select * from pilotes',
            function (err, rows, fields) {
                if (!err) {
                    callback(rows);
                } else {
                    console.log('Error while performing Query : ' + err);
                }
            });
    };
    find(id, callback) {
        if (this.checkId(id)) {
            this.connection.query('select * from pilotes where id=?', id,
                function (err, rows, fields) {
                    if (!err) {
                        var error;
                        if (rows.length === 0) {
                            error = "Driver #" + id + " not found !";
                        }
                        callback(error, rows);
                    } else {
                        console.log('Error while performing Query : ' + err);
                    }
                });
        } else {
            var error = "Bad id format !";
            callback(error, {});
        }
    };

    create(driver, callback) {
        this.connection.query('insert into pilotes set ?', driver,
            function (err, result) {
                if (err) {
                    console.log(err);
                    callback(err, -1) ;
                } else {
                    callback(err, result.insertId);
                }
            });
    };

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

    delete(id, callback) {
        this.connection.query('delete from pilotes where id=?', id,
            function (err, result) {
                if (!err) {
                    if (result.affectedRows == 0) {
                        err = "Driver #" + id + " not deleted !";
                    }
                }
                callback(err, result.affectedRows);
            });
    };

    close() {
        this.connection.end();
    }
}

module.exports = DriverDao;