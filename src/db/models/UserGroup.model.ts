import { Table, Model, ForeignKey, Column } from 'sequelize-typescript';
import User from './User.model';
import Group from './Group.model';

@Table({ tableName: 'User_Group', timestamps: false })
class User_Group extends Model {
  @ForeignKey(() => User)
  @Column
  user_id!: number;

  @ForeignKey(() => Group)
  @Column
  group_id!: number;
}

export default User_Group;