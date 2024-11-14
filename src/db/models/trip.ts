import { Table, Column, Model, PrimaryKey, AutoIncrement, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import User from './User';
import Group from './Group';
import User_Trip from './UserTrip';
import Group_Trip from './GroupTrip';

@Table({ tableName: 'Trip', timestamps: false })
class Trip extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    trip_id!: number;

    @Column
    start_location!: string;

    @BelongsToMany(() => User, () => User_Trip)
    users!: User[];

    @BelongsToMany(() => Group, () => Group_Trip)
    groups!: Group[];
}

export default Trip;