require('dotenv').config();
import { Sequelize } from 'sequelize-typescript';
const pgtools = require('pgtools');

const config = {
    user: process.env.username,
    password: process.env.password,
    host: process.env.host,
    port: 5432
};

const dbName = 'taxibrousse';

let sequelize: Sequelize;

pgtools.createdb(config, dbName)
    .then(() => {
        console.log(`Database "${dbName}" created successfully.`);

        sequelize = new Sequelize(dbName, process.env.username, process.env.password, {
            host: process.env.host,
            dialect: 'postgres',
            port: 5432,
        });

        return sequelize.sync({ force: true });
    })
    .then(() => {
        console.log("Database & tables created!");
    })
    .catch((err: any) => {
        if (err.name === 'duplicate_database') {
            console.log(`Database "${dbName}" already exists.`);

            sequelize = new Sequelize(dbName, process.env.username, process.env.password, {
                host: process.env.host,
                dialect: 'postgres',
                port: 5432,
            });

            sequelize.sync({ force: true })
                .then(() => {
                    console.log("Database & tables created!");
                })
                .catch((error: Error) => {
                    console.error("Error syncing the database:", error);
                });
        } else {
            console.error("Error creating the database:", err);
        }
    });

export default sequelize;