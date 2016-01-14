"use strict";

var mysql = require("mysql");
var util = require("util");
var DefaultDao = require('./default-dao');

class TrackDao extends DefaultDao {

    constructor(dbConnector) {
        super(dbConnector, 'circuits', 'Track');
        this.updateStategy = ["nom", "longueur", "idPays"];
    }
}

module.exports = TrackDao;