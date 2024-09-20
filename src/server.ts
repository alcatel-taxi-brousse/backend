import sequelize from './db/models/index';

sequelize.sync({ force: true })
    .then(() => {
        console.log("Database & tables created!");
    })
    .catch(error => {
        console.log("Error syncing the database:", error);
    });