const  sequelize  = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
'user',
{
    id:{
        type:sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name:{
        type:sequelize.STRING
    },
    last_name:{
        type:sequelize.STRING
    },
    email:{
        type:sequelize.STRING
    },
    password:{
        type:sequelize.STRING
    },
    phone:{
        type:sequelize.INTEGER
    },
    created:{
        type:sequelize.DATE,
        defaultValue: sequelize.NOW
    },
    

    
},
    {

    timestamps:false
    }
)