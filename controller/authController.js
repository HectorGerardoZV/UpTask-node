const passport  = require("passport");

exports.loginForm = (req, res, next)=>{

    const {error} = res.locals.messages;
    
    const inputs = [
        {
            label : "User Name",
            input: "userName",
            type: "text",
            placeHolder: "Your User Name"
        },
        {
            label : "Password",
            input: "password",
            type: "password",
            placeHolder: "Your Password"
        }
    ];
    res.render("login",{
        namePage: "UpTask-Login",
        inputs,
        errors:error

    })
}
exports.signupForm = (req, res, next)=>{

    
    const {error} = res.locals.messages;
    console.log(error);
    const inputs = [
        {
            label : "User Name",
            input: "userName",
            type: "text",
            placeHolder: "Your User Name"
        },
        {
            label : "Email",
            input: "email",
            type: "email",
            placeHolder: "Your Email"
        },
        {
            label : "Password",
            input: "password",
            type: "password",
            placeHolder: "Your Password"
        }
    ];
    res.render("signup",{
        namePage: "UpTask-Signup",
        inputs,
        errors: error

    })
}
exports.resetPasswordForm = (req, res, next)=>{

    const inputs = [
        {
            label : "Eamil",
            input: "email",
            type: "email",
            placeHolder: "Your Email"
        }
    ];
    res.render("resetpassword",{
        namePage: "UpTask-ResetPassword",
        inputs

    })
}

exports.validateLogin =passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/login",
    failureFlash: true,
    badRequestMessage: "Fill in the fields"
});

exports.isAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    else{
        return res.redirect("/login");
    }
}

exports.logout = (req, res)=>{
    req.session.destroy(()=>{
        res.redirect("/login");
    })
}