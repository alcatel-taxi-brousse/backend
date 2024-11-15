import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import User from './User.model';
import Trip from './Trip.model';
import User_Group from './UserGroup.model';
import Group_Trip from './GroupTrip.model';

@Table({ tableName: 'Group', timestamps: false })
class Group extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  group_id!: number;

  @Column
  name!: string;

  @Column
  description!: string;

  @Column
  destination!: string;

  @Column
  private!: boolean;

  @Column
  join_id!: number;

  @BelongsToMany(() => User, () => User_Group)
  users!: User[];

  @BelongsToMany(() => Trip, () => Group_Trip)
  trips!: Trip[];
}

export default Group;