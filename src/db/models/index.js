const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('taxibrousse', 'zinedine', '', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
});

module.exports = sequelize;