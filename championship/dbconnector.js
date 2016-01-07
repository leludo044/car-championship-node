'use strict';

var url = require('url');

class DbConnector{
    
    constructor() {
    this.username ="" ;
    this.password ="" ;
        
    }
    
    parse() {
        /*
        mysql://root:root@localhost/heroku_0d3bcca37c58950?reconnect=true
        */
        console.log(url.parse('mysql://root:root@localhost/heroku_0d3bcca37c58950?reconnect=true'));
    }
}
