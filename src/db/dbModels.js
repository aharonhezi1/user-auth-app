const { sequelize,Sequelize } = require('./sequelize');
//const { DataTypes } = require('sequelize'); // Import the built-in data types
const isValidIsraeliID=require('../utils/isValidIsraeliID')

const User=sequelize.define('user',{
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        len: [2,30],

    },
    id:{
        type: Sequelize.STRING,
        allowNull: false, 
        unique: true,
        validate:{
            isValidIsraeliId(value) {
                if (!isValidIsraeliID(value)) {
                    throw new Error(value+' is an invalid Israeli id')
                }
            }
        }
    ,

    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
        isEmail: true,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    userName:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey: true,
        len: [2,20],
    }
})

const Token=sequelize.define('token',{
    token:{
        type:Sequelize.STRING,
        allowNull:false,
    }
})

Token.belongsTo(User,{foreignKey: 'userName'}); // Constraint - userName foreign key for tokens' table


module.exports = {User,Token };
