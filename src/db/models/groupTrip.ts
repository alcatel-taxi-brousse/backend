import { DataTypes } from 'sequelize';
import db from './index.js';  
import Group from './Group';  
import Trip from './Trip';  

const Group_Trip = db.define('Group_Trip', {
    group_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Group,
            key: 'group_id',
        },
    },
    trip_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Trip,
            key: 'trip_id',
        },
    },
}, {
    tableName: 'Group_Trip',
    timestamps: false,
});

export default Group_Trip;