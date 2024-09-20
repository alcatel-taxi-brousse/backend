import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('taxibrousse', 'username', 'your_password', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432, 
});

export default sequelize;