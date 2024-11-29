import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import { CommunityEntity } from './community.entity';
import { UserCommunityEntity } from './user-community.entity';
import { TripEntity } from './trip.entity';
import { UserTripEntity } from './user-trip.entity';

@Table({ tableName: 'User', timestamps: false })
export class UserEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  user_id: number;

  @Column
  name: string;

  @BelongsToMany(() => CommunityEntity, () => UserCommunityEntity)
  communities: CommunityEntity[];

  @BelongsToMany(() => TripEntity, () => UserTripEntity)
  trips: TripEntity[];
}
