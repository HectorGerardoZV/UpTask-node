const Projects = require("../model/Projects");

exports.homePage = async (req, res, next)=>{
    try {
        const projects  = await Projects.findAll();

        res.render("home",{
            namePage: "Home",
            projects
        })
    } catch (error) {
        
    }
}