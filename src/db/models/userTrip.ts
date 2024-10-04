import { DataTypes } from 'sequelize';
 import db from './index.js'; 
import User from './User'; 
import Trip from './Trip';  

const User_Trip = db.define('User_Trip', {
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    trip_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Trip,
            key: 'trip_id',
        },
    },
    nb_people: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'User_Trip',
    timestamps: false,
});

export default User_Trip;