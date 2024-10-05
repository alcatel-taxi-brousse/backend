/*require('dotenv').config();
import { Sequelize } from 'sequelize-typescript';

// Initialize Sequelize with environment variables
const sequelize = new Sequelize('taxibrousse', process.env.username as string, process.env.password as string, {
    host: process.env.host as string,
    dialect: 'postgres',
    port: 5432,
});

// Sync the database and handle errors
sequelize.sync({ force: true })
    .then(() => {
        console.log("Database & tables created!");
    })
    .catch((error: Error) => {
        console.error("Error syncing the database:", error);
    });

export default sequelize; */