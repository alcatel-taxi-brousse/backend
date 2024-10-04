import { DataTypes } from 'sequelize';
import sequelize from './index.js'; 
import User from './User'; 

const Group = sequelize.define('GroupTable', {
    group_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    destination: {
        type: DataTypes.STRING,
    },
    private: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    join_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,  // Reference to the User model
            key: 'user_id',
        },
    },
}, {
    tableName: 'GroupTable',
    timestamps: false,
});

export default Group;