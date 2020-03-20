const sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  "comment",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    video_id: {
      type: sequelize.STRING
    },
    comment: {
      type: sequelize.STRING
    },
    comment_dt: {
      type: sequelize.DATE,
      defaultValue: sequelize.NOW
    }
  },
  {
    timestamps: false
  }
);
