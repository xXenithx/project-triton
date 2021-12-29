const mongoose = require('mongoose');
const uuid = require('uuid');

const UserSchema = mongoose.Schema({
    _id: { type: String, default: uuid.v4 },
    name: String,
    username: String,
    password: String
}, {
    timestamps: true
});

UserSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = mongoose.model('User', UserSchema);