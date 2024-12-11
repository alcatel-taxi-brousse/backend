import { Table, Column, Model, ForeignKey, HasOne } from 'sequelize-typescript';
import { UserEntity } from './user.entity';
import { TripEntity } from './trip.entity';

@Table({ tableName: 'User_Trip', timestamps: false })
export class UserTripEntity extends Model {
  @ForeignKey(() => UserEntity)
  @Column
  user_id: string;

  @ForeignKey(() => TripEntity)
  @Column
  trip_id: number;

  @Column
  nb_people: number;

  @HasOne(() => UserEntity, 'user_id')
  user: UserEntity;

  @HasOne(() => TripEntity, 'trip_id')
  trip: TripEntity;
}
