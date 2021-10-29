const express = require('express');
const router = express.Router();

const autController = require("../controller/authController");
const usersController = require("../controller/usersController");
const projectsController = require("../controller/projectsController");



module.exports = function(){
    //Account rots
    router.get("/login", autController.loginForm);
    router.post("/login", autController.validateLogin);
    router.get("/signup", autController.signupForm);
    router.post("/signup",usersController.createAccount );
    router.get("/resetpassword", autController.resetPasswordForm);
    //home
    router.get("/",projectsController.homePage );
    


    return router;
}