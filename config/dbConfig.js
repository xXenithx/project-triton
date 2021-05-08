require('dotenv').config();

module.exports = {
    URL :  process.env.MONGODB_URI ||'mongodb://localhost:27017/users'
}