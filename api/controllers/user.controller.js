const usersModel = require('../models/users.model');
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
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    User.find(condition)
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while trying to fetch from database."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.userId;
    console.log(req.params)

    User.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({message: "Cannot user with id " + id});
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error while retrieving user with id " + id});
        });
};

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }

    const id = req.params.userId;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data){
                res.status(404).send({
                    message: `Cannot update user with id ${id}, check to see if user is in database!`
                });
            } else res.send({ message: "User was updated successfully."});
        })
        .catch(err =>{
            res.status(500).send({
                message: `Error updating user with id ${id}`
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.userId;

    User.findByIdAndRemove(id)
        .then(data => {
            if(!data){
                res.status(404).send({
                    message: `Cannot delete user with id ${id}`
                });
            } else {
                res.send({
                    message: `User ${id} was successfully deleted.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete user with id ${id}`
            });
        });
};