import { DataTypes } from 'sequelize';
 import db from './index.js'; 
import User from './User';  
import Group from './Group'; 

const User_Group = db.define('User_Group', {
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    group_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Group,
            key: 'group_id',
        },
    },
}, {
    tableName: 'User_Group',
    timestamps: false,
});

export default User_Group;