import { Table, Model, ForeignKey, Column } from 'sequelize-typescript';
import Group from './Group.model';
import Trip from './Trip.model';

@Table({ tableName: 'Group_Trip', timestamps: false })
class Group_Trip extends Model {
  @ForeignKey(() => Group)
  @Column
  group_id!: number;

  @ForeignKey(() => Trip)
  @Column
  trip_id!: number;
}

export default Group_Trip;