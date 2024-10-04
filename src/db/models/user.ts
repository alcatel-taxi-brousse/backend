import { DataTypes } from 'sequelize';
import sequelize from './index.js'; 

const User = sequelize.define('UserTable', {
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