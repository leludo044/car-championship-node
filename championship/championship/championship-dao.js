"use strict";

var mysql = require("mysql");
var util = require("util");
var DefaultDao = require('../default-dao');

class ChampionshipDao extends DefaultDao {

    constructor(dbConnector) {
        super(dbConnector, 'championnats', 'Championship');
        this.updateStategy = ["libelle"];
    }
}

module.exports = ChampionshipDao;