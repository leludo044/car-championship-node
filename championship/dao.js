"use strict";

var mysql = require("mysql");
var util = require("util");

class Dao {

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
        this.connection.query('select * from championnats',
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
            this.connection.query('select * from championnats where id=?', id,
                function (err, rows, fields) {
                    if (!err) {
                        var error;
                        if (rows.length === 0) {
                            error = "Championship #" + id + " not found !";
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

    create(championship, callback) {
        this.connection.query('insert into championnats set ?', championship,
            function (err, result) {
                if (err) {
                    console.log(err);
                    callback(err, -1) ;
                } else {
                    callback(err, result.insertId);
                }
            });
    };

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

    delete(id, callback) {
        this.connection.query('delete from championnats where id=?', id,
            function (err, result) {
                if (!err) {
                    if (result.affectedRows == 0) {
                        err = "Championship #" + id + " not deleted !";
                    }
                }
                callback(err, result.affectedRows);
            });
    };

    close() {
        this.connection.end();
    }
}

module.exports = Dao;