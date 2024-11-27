import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { User } from './user.entity';
import { Trip } from './trip.entity';

@Table({ tableName: 'User_Trip', timestamps: false })
export class UserTrip extends Model {
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Trip)
  @Column
  trip_id: number;

  @Column
  nb_people: number;
}
