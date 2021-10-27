const Sequelize = require("sequelize");
const database = require("../config/database");
const Projects = require("./Projects");

const Tasks = database.define("tasks",{
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(100),
    state: Sequelize.STRING(1)
});

Tasks.belongsTo(Projects);
module.exports = Tasks;