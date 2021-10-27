const express = require("express");
const routes = require('./routes/router');
const path = require("path");
const app = express();
const database = require("./config/database");
const bodyParser = require("body-parser");

//Ading models
require("./model/User");
require("./model/Projects");
require("./model/Tasks");

//Database
database.sync()
    .then(() => console.log('Connected with the server'))
    .catch(error => console.log(error));

//Enabling the static files
app.use(express.static("public"));

//enabling pug engine
app.set("view engine","pug");

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Enablig the views files
app.set("views", path.join(__dirname, "./view"));






//Enablig Router
app.use('/', routes() );

app.listen(5000,()=>{
    console.log("Server connected");
});