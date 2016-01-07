'use strict';

var dao = require("./dao");


dao.findAll(function (championships) {
    console.log(championships);
});

dao.find('a', function (err, championship) {
    if (err) {
        console.log(err);
    } else {
        console.log(championship);
    }
});

/*
dao.save({id:3, libelle:"toto"}, function(err, insertedId) {
    console.log(insertedId);
})

dao.delete(3, function(err, affectdRows) {
    console.log(affectdRows);
})
*/


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