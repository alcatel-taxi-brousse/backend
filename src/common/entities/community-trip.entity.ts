import { Table, Model, ForeignKey, Column } from 'sequelize-typescript';
import { CommunityEntity } from './community.entity';
import { TripEntity } from './trip.entity';

@Table({ tableName: 'Community_Trip', timestamps: false })
export class CommunityTripEntity extends Model {
  @ForeignKey(() => CommunityEntity)
  @Column
  community_id: string;

  @ForeignKey(() => TripEntity)
  @Column
  trip_id: number;
}
