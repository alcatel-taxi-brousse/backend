import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import Group from './Group.model';
import Trip from './Trip.model';
import User_Group from './UserGroup.model';
import User_Trip from './UserTrip.model';

@Table({ tableName: 'User', timestamps: false })
class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  user_id!: number;

  @Column
  name!: string;

  @BelongsToMany(() => Group, () => User_Group)
  groups!: Group[];

  @BelongsToMany(() => Trip, () => User_Trip)
  trips!: Trip[];
}

export default User;