var mongoose = require('mongoose');
var clientSchema = require('../models/Clients');

clientSchema.statics = {
    create: function(data, cb){
        var client = new this(data);
        client.save(cb);
    },
    get: function(query, cb){
        this.find(query, cb);
    },
    getByName: function(query, cb){
        this.find(query,cb)
    },
    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },
    delete: function(query, cb){
        this.findOneAndDelete(query, cb);
    }
}

var clientsModel = mongoose.model('Clients', clientSchema);
module.exports = clientsModel;