require('dotenv').config();
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize('taxibrousse', process.env.username, process.env.password, {
    host: process.env.host,
    dialect: 'postgres',
    port: 5432,
});

export default sequelize;