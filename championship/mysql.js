'use strict';

var dao = require("./dao");


dao.findAll(function (championships) {
    console.log(championships);
});

dao.find(1, function (err, championship) {
    if (err) {
        console.log(err);
    } else {
        console.log(championship);
    }
});


dao.create({id:3, libelle:"toto"}, function(err, insertedId) {
    console.log("Create "+insertedId);
})
dao.findAll(function (championships) {
    console.log(championships);
});
dao.update({id:3, libelle:"titi"}, function(err, affectdRows) {
    console.log("Update " + affectdRows);
})
dao.findAll(function (championships) {
    console.log(championships);
});
dao.delete(3, function(err, affectdRows) {
    console.log("Delete " + affectdRows);
})
dao.findAll(function (championships) {
    console.log(championships);
});



var url = require('url');
class DbConnector {

    constructor() {
        this.username = "";
        this.password = "";
        this.hostname = "";
        this.database = "";
    }

    parse(dbUri) {
        /*
        mysql://root:root@localhost/heroku_0d3bcca37c58950?reconnect=true
        */
        let mysqlDbUri = url.parse(dbUri) ;
        console.log(mysqlDbUri);
        if (mysqlDbUri.protocol === 'mysql:') {
            let authentication = mysqlDbUri.auth.split(':') ;
            this.hostname = mysqlDbUri.hostname ;
            this.username =authentication[0] ;
            this.password = authentication[1] ;
            this.database = mysqlDbUri.path ;
        } else {
            console.log("Bad URI !");
        }
    }
}


var connector = new DbConnector;
connector.parse('mysql://root:root@localhost/heroku_0d3bcca37c58950?reconnect=true');
console.log(connector);

dao.close();