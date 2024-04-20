const Sequelize = require('sequelize');

const sequelize = new Sequelize('Students', 'root', 'node123@', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;