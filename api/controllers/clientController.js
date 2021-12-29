var Clients = require('../DataAccesObjects/clientDAO');

exports.createClient = function(req, res, next){
    var client = {
        name: req.body.name
    };
    console.log("Body: " + req.body)
    Clients.create(client, function(err, client){
        if(err){
            res.json({
                error: err
            })
            console.log(err);
            return res.json();
        }
        res.json({
            message: "Client created successfully."
        })
    })
}

exports.getClients = function(req, res, next){
    Clients.get({}, function(err, clients){
        if(err){
            res.json({
                error: err
            })
            console.log(err);
            return res.json();
        }

        res.json({
            clients: clients
        })
    })
}

exports.getClient = function(req, res, next){
    Clients.get({name: req.params.name}, function(err, clients){
        if(err){
            res.json({
                error: err
            })
            console.log(err);
            return res.json();
        }
        
        res.json({
            clients: clients
        })
        
    })
}

exports.updateClient = function(req, res, next){
    var client = {
        name: req.body.name,
        _id: req.body.id
    }

    Clients.updateOne({_id: req.params.id}, client, function(err, client){
        if(err){
            res.json({
                error: err
            })
            console.log(err);
            return res.json();
        }
        res.json({
            message: "Client successfully updated."
        })
    })
}

exports.removeClient = function(req, res, next){
    Clients.deleteMany({_id: req.params.id}, function(err, client){
        if(err){
            res.json({
                error: err
            })
            console.log(err);
            return res.json();
        }
        res.json({
            message: "Client successfully removed."
        })
    })
}