import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import Group from './Group';
import Trip from './Trip';

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