import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Trip } from './trip.entity';
import { UserGroup } from './user-group.entity';
import { GroupTrip } from './group-trip.entity';

@Table({ tableName: 'Group', timestamps: false })
export class Group extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  group_id: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  destination: string;

  @Column
  private: boolean;

  @Column
  join_id: number;

  @BelongsToMany(() => User, () => UserGroup)
  users: User[];

  @BelongsToMany(() => Trip, () => GroupTrip)
  trips: Trip[];
}