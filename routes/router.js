const express = require('express');
const router = express.Router();

const autController = require("../controller/authController");



module.exports = function(){
    router.get("/login", autController.loginForm);
    router.get("/signup", autController.signupForm);
    router.get("/resetpassword", autController.resetPasswordForm);
    return router;
}