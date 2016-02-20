"use strict";

var mysql = require("mysql");
var util = require("util");

class CountryDao {

    constructor(pool, tableName, entityName) {
        this.pool = pool;
        this.tableName = tableName;
        this.entityName = entityName;
    }

    findAll(callback) {
        this.pool.query('select * from ' + this.tableName,
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