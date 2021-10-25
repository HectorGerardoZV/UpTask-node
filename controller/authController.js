exports.loginForm = (req, res, next)=>{

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
        inputs

    })
}
exports.signupForm = (req, res, next)=>{

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
        inputs

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
