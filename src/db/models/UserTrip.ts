import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import User from './User';
import Trip from './Trip';

@Table({ tableName: 'User_Trip', timestamps: false })
class User_Trip extends Model {
  @ForeignKey(() => User)
  @Column
  user_id!: number;

  @ForeignKey(() => Trip)
  @Column
  trip_id!: number;

  @Column
  nb_people!: number;
}

export default User_Trip;