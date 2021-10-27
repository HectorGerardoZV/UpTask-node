const Sequelize = require("sequelize");
const database = require("../config/database");
const bcryptNode = require("bcrypt-nodejs");
const Projects = require("./Projects")
const Users = database.define("users",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true  
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            isEmail:{
                msg:"Agrega un correo valido"
            },
            notEmpty:{
                msg:"El email es obligatorio"
            }
        },
        unique:{
            args:true,
            msg: "This email has already been used"
        }
    },
    password:{
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty:{
                msg:"La contraseña es obligatoria"
            }
        }
    },
    token: Sequelize.STRING,
    expiration: Sequelize.DATE
},{
    hooks:{
        beforeCreate(user){
            user.password = bcryptNode.hashSync(user.password, bcryptNode.genSaltSync(10));
        }
    }
}

);

Users.prototype.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
} 

Users.hasMany(Projects)


module.exports = Users;