const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
    'video',
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: sequelize.STRING
        },
        source:{
            type: sequelize.STRING
        },
        uploader_id:{
            type: sequelize.INTEGER
        },
        uploadDate:{
            type: sequelize.DATE,
            defaultValue: sequelize.NOW
        }

    },
        {
            timestamps:false
        }
)