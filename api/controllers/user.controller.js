const User = require('../models/users.model');

exports.create = (req, res) => {
    console.log(req.body)
    if(!req.body.name){
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    const user = new User({
        name: req.body.name || "default",
        username: req.body.username,
        password: req.body.password
    });

    user.save()
    .then( data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating the user."
        });
    });
};

exports.findAll = (req, res) => {

};

exports.findOne = (req, res) => {

};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};