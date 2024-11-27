import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Group } from './group.entity';
import { UserTrip } from './user-trip.entity';
import { GroupTrip } from './group-trip.entity';
import { Expose } from 'class-transformer';

@Table({ tableName: 'Trip', timestamps: false })
export class Trip extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  trip_id: number;

  @Column
  start_location: string;

  @Column
  date: Date;

  @Column
  frequence: string;

  @Column
  nb_seats_car: number;

  @Column
  description: string;

  @ForeignKey(() => User)
  @Column
  creator_user_id: number;

  @BelongsToMany(() => User, () => UserTrip)
  users: User[];

  @BelongsToMany(() => Group, () => GroupTrip)
  groups: Group[];

  @Expose({ toPlainOnly: true })
  get nb_people(): number {
    return this.users ? this.users.length : 0;
  }
}