"use strict";

var mysql = require("mysql");
var util = require("util");
var DefaultDao = require('./default-dao');

class DriverDao extends DefaultDao {

    constructor(dbConnector) {
        super(dbConnector, 'pilotes', 'Driver');
        this.updateStategy = ["nom"];
    }
}

module.exports = DriverDao;