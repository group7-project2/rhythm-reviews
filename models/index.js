// main/models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js.BKP');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// main/models/Review.js
const Review = sequelize.define('Review', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

User.hasMany(Review);
Review.belongsTo(User);

module.exports = { User, Review };
