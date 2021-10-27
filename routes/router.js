const express = require('express');
const router = express.Router();

const autController = require("../controller/authController");
const usersController = require("../controller/usersController");



module.exports = function(){
    router.get("/login", autController.loginForm);
    router.get("/signup", autController.signupForm);
    router.get("/resetpassword", autController.resetPasswordForm);
    router.post("/signup",usersController.createAccount );


    return router;
}