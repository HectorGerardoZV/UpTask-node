const Users = require("../model/User");

exports.createAccount =  async (req,res,next)=>{
    try {
        const {userName, email, password} = req.body;
        
        await Users.create({
            userName, 
            email,
            password 
        })

        res.redirect("/login");
        
    } catch (error) {
        req.flash("error",error.errors.map(error=>error.message));
        
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
            errors: req.flash()

        })
    }
}