import { Table, Column, Model, PrimaryKey, AutoIncrement, BelongsToMany } from 'sequelize-typescript';
import User from './User';
import Trip from './Trip';
import User_Group from './UserGroup';
import Group_Trip from './GroupTrip';

@Table({ tableName: 'Group', timestamps: false })
class Group extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    group_id!: number;

    @Column
    name!: string;

    @BelongsToMany(() => User, () => User_Group)
    users!: User[];

    @BelongsToMany(() => Trip, () => Group_Trip)
    trips!: Trip[];
}

export default Group;