import { DataTypes } from 'sequelize';
import db from '../db';
import User from './User'; 

const Trip = db.define('Trip', {
    trip_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    start_location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    frequence: {
        type: DataTypes.STRING,
    },
    nb_seats_car: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.TEXT,
    },
    creator_user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User, 
            key: 'user_id',
        },
    },
}, {
    tableName: 'Trip',
    timestamps: false,
});

export default Trip;