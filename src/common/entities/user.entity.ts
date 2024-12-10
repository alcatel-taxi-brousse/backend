import {
  Table,
  Column,
  Model,
  PrimaryKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { CommunityEntity } from './community.entity';
import { UserCommunityEntity } from './user-community.entity';
import { TripEntity } from './trip.entity';
import { UserTripEntity } from './user-trip.entity';

@Table({ tableName: 'User', timestamps: false })
export class UserEntity extends Model {
  @PrimaryKey
  @Column
  user_id: string;

  @Column
  name: string;

  @BelongsToMany(() => CommunityEntity, () => UserCommunityEntity)
  communities: CommunityEntity[];

  @BelongsToMany(() => TripEntity, () => UserTripEntity)
  trips: TripEntity[];
}
