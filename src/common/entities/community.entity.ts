import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { UserEntity } from './user.entity';
import { TripEntity } from './trip.entity';
import { UserCommunityEntity } from './user-community.entity';

@Table({ tableName: 'Community', timestamps: false })
export class CommunityEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  community_id: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  destination: string;

  @Column
  private: boolean;

  @Column
  join_id: number;

  @BelongsToMany(() => UserEntity, () => UserCommunityEntity)
  users: UserEntity[];

  @HasMany(() => TripEntity, 'community_id')
  trips: TripEntity[];
}
