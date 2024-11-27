import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import { Group } from './group.entity';
import { UserGroup } from './user-group.entity';
import { Trip } from './trip.entity';
import { UserTrip } from './user-trip.entity';

@Table({ tableName: 'User', timestamps: false })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  user_id: number;

  @Column
  name: string;

  @BelongsToMany(() => Group, () => UserGroup)
  groups: Group[];

  @BelongsToMany(() => Trip, () => UserTrip)
  trips: Trip[];
}
