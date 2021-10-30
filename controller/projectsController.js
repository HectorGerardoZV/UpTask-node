const Projects = require("../model/Projects");

exports.homePage = async (req, res, next)=>{
    const userId =  res.locals.user.id;
    try {
        const projects  = await Projects.findAll();

        console.log(projects.lenght);
        res.render("home",{
            namePage: "Home",
            projects,
            userId
        })
    } catch (error) {
        
    }
}

exports.newProjectForm = async (req, res)=>{
    try {
        res.render("newProject",{
            namePage: "New Project"
        })
    } catch (error) {
        
    }
}
exports.newProject = async (req,res)=>{
    try {
        const {user} =  res.locals;
        const {name} = req.body;
        await Projects.create({ name, userId: user.id });

        res.redirect("/");
    } catch (error) {
        
    }
}

