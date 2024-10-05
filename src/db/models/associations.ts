import User from './User';
import Group from './Group';
import Trip from './Trip';
import User_Group from './UserGroup';
import Group_Trip from './GroupTrip';
import User_Trip from './UserTrip';

User.belongsToMany(Group, { through: User_Group });
Group.belongsToMany(User, { through: User_Group });

Group.belongsToMany(Trip, { through: Group_Trip });
Trip.belongsToMany(Group, { through: Group_Trip });

User.belongsToMany(Trip, { through: User_Trip });
Trip.belongsToMany(User, { through: User_Trip });