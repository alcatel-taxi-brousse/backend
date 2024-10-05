import { DataTypes } from 'sequelize';
 import db from './index.js'; 

const User = db.define('UserTable', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'UserTable',
    timestamps: false
});

export default User;