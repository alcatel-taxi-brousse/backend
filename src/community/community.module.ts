import { Module } from '@nestjs/common';
import { CommunityController } from './controllers/community.controller';
import { CommunityService } from './services/community.service';
import { TripService } from './services/trip.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TripEntity } from '../common/entities/trip.entity';
import { CommunityEntity } from '../common/entities/community.entity';
import { UserTripEntity } from '../common/entities/user-trip.entity';
import { UserEntity } from '../common/entities/user.entity';
import { UserCommunityEntity } from '../common/entities/user-community.entity';
import { TripController } from './controllers/trip.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([
      TripEntity,
      CommunityEntity,
      UserTripEntity,
      UserEntity,
      UserCommunityEntity,
    ]),
  ],
  controllers: [CommunityController, TripController],
  providers: [CommunityService, TripService],
})
export class CommunityModule {}
