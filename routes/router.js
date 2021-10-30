const express = require('express');
const router = express.Router();

const autController = require("../controller/authController");
const usersController = require("../controller/usersController");
const projectsController = require("../controller/projectsController");



module.exports = function(){
    //Account rots
    //Login routs
    router.get("/login", autController.loginForm);
    router.post("/login", autController.validateLogin);
    //Logout routs
    router.get("/logout", autController.logout);
    //Signup routs
    router.get("/signup", autController.signupForm);
    router.post("/signup",usersController.createAccount );

    //Reset password routs
    router.get("/resetpassword", autController.resetPasswordForm);
    //home
    router.get("/",
        autController.isAuthenticated,
        projectsController.homePage 
    );
    router.get("/newProject",
    autController.isAuthenticated,
    projectsController.newProjectForm );
    router.post("/newProject",
    autController.isAuthenticated,
    projectsController.newProject );
    


    return router;
}