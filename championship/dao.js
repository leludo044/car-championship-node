"use strict";

var mysql = require("mysql");
var util = require("util");

var checkId = function (id) {
    var isValid = false;
    var targetId = id;
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

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'heroku_0d3bcca37c58950'
});

connection.connect();

var findAll = function (callback) {
    connection.query('select * from championnats',
        function (err, rows, fields) {
            if (!err) {
                callback(rows);
            } else {
                console.log('Error while performing Query : ' + err);
            }
        });
};

var find = function (id, callback) {
    if (checkId(id)) {
        connection.query('select * from championnats where id=?', id,
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

module.exports.save = function (championship, callback) {
    connection.query('insert into championnats set ?', championship,
        function (err, result) {
            if (err) {
                console.log(err);
            }
            callback(err, result.insertId);
        });
};

module.exports.delete = function (id, callback) {
    connection.query('delete from championnats where id=?', id,
        function (err, result) {
            if (err) {
                console.log(err);
            }
            callback(err, result.affectedRows);
        });
};

module.exports.findAll = findAll;
module.exports.find = find;
module.exports.close = function () {
    connection.end();
};