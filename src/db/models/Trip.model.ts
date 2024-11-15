import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
  ForeignKey,
  HasMany,
  DataType,
} from 'sequelize-typescript';
import User from './User.model';
import Group from './Group.model';
import User_Trip from './UserTrip.model';
import Group_Trip from './GroupTrip.model';

@Table({ tableName: 'Trip', timestamps: false })
class Trip extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  trip_id!: number;

  @Column
  start_location!: string;

  @Column
  date!: Date;

  @Column
  frequence!: string;

  @Column
  nb_seats_car!: number;

  @Column
  description!: string;

  @ForeignKey(() => User)
  @Column
  creator_user_id!: number;

  @BelongsToMany(() => User, () => User_Trip)
  users!: User[];

  @BelongsToMany(() => Group, () => Group_Trip)
  groups!: Group[];

  // Pas de virtual 
  get nb_people(): number {
    return this.users ? this.users.length : 0;
  }
}

export default Trip;