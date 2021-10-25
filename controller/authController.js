exports.login = (req, res, next)=>{

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