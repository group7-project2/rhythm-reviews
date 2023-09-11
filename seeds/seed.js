const sequelize = require('../config/connection');

const usersSeed = require('./userData');
const reviewsSeed = require('./reviewData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await usersSeed();
  await reviewsSeed();

  process.exit(0);
};

seedDatabase();