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
   const {error} = res.locals.messages;
   console.log(error);
    
    try {
        const projects  = await Projects.findAll({where: {userId: userId}});
        res.render("newProject",{
            namePage: "New Project",
            projects,
            action: "Creating Project",
            errors:error
        })
    } catch (error) {
        
    }
}

exports.newProject = async (req,res)=>{
    try {
        const {user} =  res.locals;
        const {name} = req.body;
        let nameProject = name.trim();
        if(nameProject){
            await Projects.create({ name:nameProject, userId: user.id });
            res.redirect("/");
        }
        else{
            req.flash("error","The project name is required");
            res.redirect("/newProject");
        }
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
        const {error} = res.locals.messages;

        res.render("project",{
            namePage: "Project",
            project,
            projects,
            tasks,
            errors:error
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
        const {error} = res.locals.messages;
        res.render("newProject",{
            namePage: "Edit Project",
            projects,
            project,
            action: "Editing Project",
            errors:error
        })
    } catch (error) {
        
    }
}
exports.editProject = async (req, res)=>{
    const {url} = req.params;
    const {name} = req.body;
    try {
        const project = await Projects.findOne({where: {url:url}});
        let projectName = name.trim();
            if(projectName){
                Projects.update(
                    {name: projectName},
                    {where: {id: project.id}}
                    )
                res.redirect(`/projectView/${project.url}`);    
            }else{
                req.flash("error","The project name is required");
                res.redirect(`/editProject/${project.url}`);    
            }
        
   
    
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