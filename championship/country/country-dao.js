"use strict";

var mysql = require("mysql");
var util = require("util");

class CountryDao {

    constructor(dbConnector, tableName, entityName) {
        this.connect(dbConnector);
        this.tableName = tableName;
        this.entityName = entityName;
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

    findAll(callback) {
        this.connection.query('select * from ' + this.tableName,
            function (err, rows, fields) {
                if (!err) {
                    callback(rows);
                } else {
                    console.log('Error while performing Query : ' + err);
                }
            });
    };

}

module.exports = CountryDao;