const express = require('express');
const router = express.Router();

const autController = require("../controller/authController");
const usersController = require("../controller/usersController");
const projectsController = require("../controller/projectsController");
const tasksController = require("../controller/tasksController");



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
    //New Project
    router.get("/newProject",
        autController.isAuthenticated,
        projectsController.newProjectForm 
    );
    router.post("/newProject",
        autController.isAuthenticated,
        projectsController.newProject 
    );
    //Project View
    router.get("/projectView/:url",
        autController.isAuthenticated,
        projectsController.projectView
    );

    router.get("/editProject/:url", 
        autController.isAuthenticated,
        projectsController.editProjectForm
    )
    router.post("/editProject/:url", 
        autController.isAuthenticated,
        projectsController.editProject
    )
    router.delete("/deleteProject/:url", 
        autController.isAuthenticated,
        projectsController.deleteProject
    )

    //Tasks Routes
    router.post("/newTask/:url",
        autController.isAuthenticated,
        tasksController.addTask
    )
    router.delete("/deleteTask/:id",
        autController.isAuthenticated,
        tasksController.deleteTask
    )
    router.patch("/updateTask/:id",
        autController.isAuthenticated,
        tasksController.updateTask
    )

    return router;
}