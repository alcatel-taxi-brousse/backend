import { Table, Model, ForeignKey, Column } from 'sequelize-typescript';
import { UserEntity } from './user.entity';
import { CommunityEntity } from './community.entity';

@Table({ tableName: 'User_Community', timestamps: false })
export class UserCommunityEntity extends Model {
  @ForeignKey(() => UserEntity)
  @Column
  user_id: string;

  @ForeignKey(() => CommunityEntity)
  @Column
  community_id: string;
}
