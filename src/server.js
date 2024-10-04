const sequelize = require('./db/models/index.js')

sequelize.sync({ force: true })
    .then(() => {
        console.log("Database & tables created!");
    })
    .catch(error => {
        console.log("Error syncing the database:", error);
    });