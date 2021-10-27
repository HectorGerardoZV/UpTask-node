const Sequelize = require("sequelize");
const database = require("../config/database");
const slug = require("slug");
const shortId = require("shortid");

const Projects = database.define("projects",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true  
    },
    name :  Sequelize.STRING(100),
    url : Sequelize.STRING(100)
},{
    hooks:{
        beforeCreate(project){
            const url = slug(project.name).toLowerCase();
            project.url = `${url}-${shortId.generate()}`;
        }
    }
});

module.exports = Projects;