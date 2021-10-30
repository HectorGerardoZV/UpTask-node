const express = require("express");
const routes = require('./routes/router');
const path = require("path");
const app = express();
const database = require("./config/database");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("./config/passport");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

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
app.use(flash());
app.use(cookieParser());

//Agregando sessiones
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false

}));

app.use(passport.initialize());
app.use(passport.session());

//User asignation
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    res.locals.user = {...req.user}||null;
    next();
});





//Enablig Router
app.use('/', routes() );

app.listen(5000,()=>{
    console.log("Server connected");
});