require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dbConfig = require('./config/dbConfig');
const bodyParserJSON = require('body-parser').json();
const urlEncoded = require('body-parser').urlencoded({extended: true});

app.use(urlEncoded);
app.use(bodyParserJSON);

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/views/index.html")
})

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.URL,{
    useNewUrlParser: true
}).then( () =>{
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
});

require('./api/routers/usersRoute')(app);
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})