var mongoose = require('mongoose');
const MUUID = require('uuid-mongodb'); 
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    id:{
        type: String,
        unique: true,
        required: false,
        default: function genUUID(){
            return MUUID.v1()
        }
    }
});

module.exports = ClientSchema;