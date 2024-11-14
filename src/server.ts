require('dotenv').config();
import { Sequelize } from 'sequelize-typescript';
const pgtools = require('pgtools'); 
import User from './db/models/User';
import Group from './db/models/Group';
import Trip from './db/models/Trip';
import User_Group from './db/models/UserGroup';
import Group_Trip from './db/models/GroupTrip';
import User_Trip from './db/models/UserTrip';

const config = {
    user: process.env.username,
    password: process.env.password,
    host: process.env.host,
    port: 5432
};

const dbName = 'taxibrousse';

let sequelize: Sequelize;

function initializeSequelize() {
    sequelize = new Sequelize({
        dialect: 'postgres',
        host: config.host,
        port: config.port,
        username: config.user,
        password: config.password,
        database: dbName,
        logging: console.log,
    });
  
    sequelize.addModels([User, Group, Trip, User_Group, Group_Trip, User_Trip]);
}

async function syncTables() {
    try {
        await sequelize.sync({ force: true });
        console.log("Database & tables created successfully!");
    } catch (error) {
        console.error("Error syncing the database:", error);
    }
}

pgtools.createdb(config, dbName)
    .then(() => {
        console.log(`Database "${dbName}" created successfully.`);
        initializeSequelize();
        return syncTables();
    })
    .catch((err: any) => {
        if (err.name === 'duplicate_database') {
            console.log(`Database "${dbName}" already exists.`);
            initializeSequelize();
            syncTables();
        } else {
            console.error("Error creating the database:", err);
        }
    });

export default sequelize;