const Projects = require("../model/Projects");
const Tasks = require("../model/Tasks");

exports.homePage = async (req, res, next)=>{
    const userId = res.locals.user.id;
    try {
        const projects  = await Projects.findAll({where: {userId: userId}});       
        res.render("home",{
            namePage: "Home",
            projects
            
        })
    } catch (error) {
        
    }
}

exports.newProjectForm = async (req, res)=>{
    const userId = res.locals.user.id;
    try {
        const projects  = await Projects.findAll({where: {userId: userId}});
        res.render("newProject",{
            namePage: "New Project",
            projects,
            action: "Creating Project"
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

exports.projectView = async (req, res)=>{
    try {
        const userId = res.locals.user.id;
        const {url} = req.params;
        const projectPromise  =  Projects.findOne({where:{url:url}});
        const projectsPromise  =  Projects.findAll({where: {userId: userId}});

        const [projects, project] = await Promise.all([projectsPromise, projectPromise]);

        const tasks = await Tasks.findAll({where: {projectId:project.id}});


        res.render("project",{
            namePage: "Project",
            project,
            projects,
            tasks
        })
    } catch (error) {
        
    }
}

exports.editProjectForm = async (req, res)=>{
    const userId = res.locals.user.id;
    const {url} = req.params;
    try {
        const projectsPromise  =  Projects.findAll({where: {userId: userId}});
        const projectPromise =  Projects.findOne({where: {url:url}});

        const [projects, project] = await Promise.all([projectsPromise, projectPromise]);

        res.render("newProject",{
            namePage: "Edit Project",
            projects,
            project,
            action: "Editing Project"
        })
    } catch (error) {
        
    }
}
exports.editProject = async (req, res)=>{
    const {url} = req.params;
    const {name} = req.body;
    try {
     const project = await Projects.findOne({where: {url:url}});

    Projects.update(
         {name: name},
         {where: {id: project.id}}
         )
    res.redirect(`/projectView/${project.url}`);    
    
    } catch (error) {
        
    }
}
exports.deleteProject = async (req, res, next)=>{
    try {
        const url = req.params.url;
        const response = await Projects.destroy({ where: { url } });

        if(!response){
            return next();
        }
        res.status(200).send("");
    } catch (error) {
        next();
    }
}