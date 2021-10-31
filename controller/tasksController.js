const Tasks = require("../model/Tasks");
const Projects = require("../model/Projects");


exports.addTask = async (req, res, next)=>{
    try {
    
        const {url} = req.params;
        const {name} = req.body;
        const project = await Projects.findOne({where:{url:url}});
       const task = await Tasks.create({
            name, 
            projectId: project.id,
            state: 0
        })
        if(!task){
            return next();
        }

        res.redirect(`/projectView/${url}`);



        
        
    } catch (error) {
        
    }
}

exports.deleteTask = async (req, res, next)=>{
    try {
    
     const {id} =  req.params;
     await Tasks.destroy({where:{id:id}});
     res.status(200).send("ok");
        
        
    } catch (error) {
        
    }
}
exports.updateTask = async (req, res, next)=>{
    try {
        const {id} = req.params;
        const task = await Tasks.findOne({where:{id:id}});
        if(task.state==0){
            task.state = 1;
        }else{
            task.state = 0;
        }
        const result = await task.save();
        if(result){
            res.status(200).send("ok");
        }else{
            return next();
        }
        
    } catch (error) {
        
    }
}