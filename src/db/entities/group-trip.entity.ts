import { Table, Model, ForeignKey, Column } from 'sequelize-typescript';
import { Group } from './group.entity';
import { Trip } from './trip.entity';

@Table({ tableName: 'Group_Trip', timestamps: false })
export class GroupTrip extends Model {
  @ForeignKey(() => Group)
  @Column
  group_id: number;

  @ForeignKey(() => Trip)
  @Column
  trip_id: number;
}
