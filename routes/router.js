const express = require('express');
const router = express.Router();

const autController = require("../controller/authController");



module.exports = function(){
    router.get("/login", autController.login);


    return router;
}