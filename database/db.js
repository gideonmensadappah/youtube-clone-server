const { Sequelize } = require('sequelize');
const db = {};

  // Connecting to a database
 const sequelize = new Sequelize('yourtube', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
    operatorsAliases: false,

    pool: {
          // Connection Pool
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  
    }

});

db.sequelize = sequelize
db.sequelize = sequelize

module.exports = db;

