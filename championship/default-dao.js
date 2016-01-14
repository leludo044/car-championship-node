"use strict";

var mysql = require("mysql");
var util = require("util");

class DefaultDao {

    constructor(dbConnector, tableName, entityName) {
        this.connect(dbConnector);
        this.tableName = tableName;
        this.entityName = entityName;
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

    find(id, callback) {
        if (this.checkId(id)) {
            this.connection.query('select * from ' + this.tableName + ' where id=?', id,
                function (err, rows, fields) {
                    if (!err) {
                        var error;
                        if (rows.length === 0) {
                            error = this.entityName + " #" + id + " not found !";
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

    create(entity, callback) {
        this.connection.query('insert into ' + this.tableName + ' set ?', entity,
            function (err, result) {
                if (err) {
                    console.log(err);
                    callback(err, -1);
                } else {
                    callback(err, result.insertId);
                }
            });
    };

    update(entity, callback) {
        let query = 'update ' + this.tableName + ' set ';
        let params = [];
        let self = this ;

        this.updateStategy.forEach(function (element) {
            query += (element + '=? ');
            params.push(entity[element]);
        }, this);
        query += 'where id=?';

        params.push(entity.id);

        console.log(query);
        console.log(params);
        this.connection.query(query, params,
            function (err, result) {
                if (!err) {
                    if (result.affectedRows == 0) {
                        err = self.entityName + " #" + entity.id + " not updated !";
                    }
                }
                callback(err, result.affectedRows);
            });
    };
    
    delete(id, callback) {
        this.connection.query('delete from ' + this.tableName + ' where id=?', id,
            function (err, result) {
                if (!err) {
                    if (result.affectedRows == 0) {
                        err = this.entityName + " #" + id + " not deleted !";
                    }
                }
                callback(err, result.affectedRows);
            });
    };
}

module.exports = DefaultDao;