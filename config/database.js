var mongoose = require('mongoose');
var chalk = require('chalk');
var dbURL = require('./properties').DB;

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

module.exports = function(){
    mongoose.connect(dbURL, { useNewUrlParser: true});
    mongoose.connection.on('connected', function(){
        console.log(connected("Mongoose default connection is open to", dbURL));
    });

    mongoose.connection.on('error', function(err){
        console.log(error("Mongoose defualt connection error has occured: " + err + "error"));
    });

    mongoose.connection.on('disconnect', function(){
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });
}
