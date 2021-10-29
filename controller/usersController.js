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
        
    }
}