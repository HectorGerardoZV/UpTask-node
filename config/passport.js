const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

//Model reference
const Users = require("../model/User");

//Local strategy = Login with credentials 
passport.use(
    new localStrategy(
        {
            usernameField: "userName",
            passwordField: "password"
        },
        async (userName,password, done)=>{
            try {
                const user = await Users.findOne({
                    where:{
                        userName:userName
                    }
                })

                if(!user.verifyPassword(password)){
                    return done(null, false, {
                        message: "Invalid Account"
                    })
                }
                
                return done(null, user);
            } catch (error) {
                return done(null, false, {
                    message: "Invalid Account"
                })
            }
        }
    )
);

passport.serializeUser((user,callback)=>{
    callback(null, user);
})

passport.deserializeUser((user,callback)=>{
    callback(null, user);
})

module.exports = passport;