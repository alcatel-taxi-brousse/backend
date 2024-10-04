require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('taxibrousse', process.env.username, process.env.password, {
    host: process.env.host,
    dialect: 'postgres',
    port: 5432,
});

module.exports = sequelize;