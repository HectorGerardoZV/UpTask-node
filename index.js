const express = require("express");
const routes = require('./routes/router');
const path = require("path");
const app = express();


//Enabling the static files
app.use(express.static("public"));

//enabling pug engine
app.set("view engine","pug");


//Enablig the views files
app.set("views", path.join(__dirname, "./view"));





//Enablig Router
app.use('/', routes() );

app.listen(5000,()=>{
    console.log("Server connected");
});