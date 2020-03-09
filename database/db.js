const { Sequelize } = require('sequelize');
const db = {};

  // Connecting to a database
 const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
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

sequelize.authenticate().then(()=> {
      console.log('sucsess')
}).catch(err => console.log(err))

db.sequelize = sequelize
db.sequelize = sequelize

module.exports = db;

