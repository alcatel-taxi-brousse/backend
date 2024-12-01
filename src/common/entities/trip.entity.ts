import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserEntity } from './user.entity';
import { CommunityEntity } from './community.entity';
import { UserTripEntity } from './user-trip.entity';
import { Expose } from 'class-transformer';

@Table({ tableName: 'Trip', timestamps: false })
export class TripEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  trip_id: number;

  @Column
  start_location: string;

  @Column
  date: Date;

  @Column
  frequence: string;

  @Column
  nb_seats_car: number;

  @Column
  description: string;

  @ForeignKey(() => UserEntity)
  @Column
  creator_user_id: string;

  @ForeignKey(() => CommunityEntity)
  @Column
  community_id: string;

  @BelongsTo(() => CommunityEntity)
  community: CommunityEntity;

  @BelongsToMany(() => UserEntity, () => UserTripEntity)
  users: UserEntity[];

  @Expose({ toPlainOnly: true })
  get nb_people(): number {
    return this.users ? this.users.length : 0;
  }
}
