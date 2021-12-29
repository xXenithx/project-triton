var express = require('express');
var log = require('morgan')('dev');
var bp = require('body-parser');

var properties = require('./config/properties');
var db = require('./config/database');

var clientRoutes = require('./api/routes/clientsRoute');
var app = express()

var bpJSON = bp.json();
var bpURLEncoded = bp.urlencoded({extended:true});

var router = express.Router();

db();

app.use(log);
app.use(bpJSON);
app.use(bpURLEncoded);

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
   next();
 });

 app.use('/api', router);
 clientRoutes(router);



app.listen(properties.PORT, (req, res)=>{
    console.log(`Server is running on ${properties.PORT} port.`)
})