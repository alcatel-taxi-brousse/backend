import { DataTypes } from 'sequelize';
import sequelize from './index';  
import Group from './Group';  
import Trip from './Trip';  

const Group_Trip = sequelize.define('Group_Trip', {
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