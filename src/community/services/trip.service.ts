import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  Optional,
} from '@nestjs/common';
import { TripEntity } from '../../common/entities/trip.entity';
import { CreateTripDto } from '../dtos/create-trip.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CommunityEntity } from '../../common/entities/community.entity';
import { UserEntity } from '../../common/entities/user.entity';
import { UserTripEntity } from '../../common/entities/user-trip.entity';
import { NodeSDK as RainbowSDK } from 'rainbow-node-sdk/lib/NodeSDK';
import { Op } from 'sequelize';

@Injectable()
export class TripService {
  constructor(
    @InjectModel(TripEntity)
    private readonly tripModel: typeof TripEntity,
    @InjectModel(CommunityEntity)
    private readonly communityModel: typeof CommunityEntity,
    @InjectModel(UserEntity)
    private readonly userModel: typeof UserEntity,
    @InjectModel(UserTripEntity)
    private readonly userTripModel: typeof UserTripEntity,
    private readonly rainbow: RainbowSDK,
    @Optional()
    private readonly logger = new Logger(TripService.name),
  ) {}

  async create(
    creatorId: string,
    communityId: string,
    createTripDto: CreateTripDto,
  ): Promise<TripEntity> {
    this.logger.verbose(
      `Creating new trip from ${createTripDto.start_location}`,
    );
    const community = await this.communityModel.findByPk(communityId);
    if (!community) {
      throw new NotFoundException('Community not found');
    }
    return this.tripModel.create({
      ...createTripDto,
      creator_user_id: creatorId,
      community_id: communityId,
    });
  }

  async findOne(id: number): Promise<TripEntity> {
    return this.tripModel.findByPk(id, {
      include: ['users', 'community'],
    });
  }

  async joinTrip(
    tripId: number,
    userId: string,
    nbPeople: number,
  ): Promise<TripEntity> {
    const trip = await this.tripModel.findByPk(tripId);
    if (!trip) {
      throw new NotFoundException('Trip not found');
    }
    const userTrips = await this.userTripModel.findAll({
      where: { trip_id: tripId },
    });

    const rainbowUser = await this.rainbow.contacts.getContactById(userId);
    if (!rainbowUser) {
      throw new NotFoundException('User not found');
    }
    // TODO: remove user entity and just rely on the id
    const [user, _] = await this.userModel.findOrCreate({
      where: { user_id: rainbowUser.id },
      defaults: {
        user_id: rainbowUser.id,
        name: rainbowUser.name?.value,
      },
    });

    const takenSeats = userTrips.reduce(
      (total, trip) => total + trip.nb_people,
      0,
    );
    let newTakenSeats = takenSeats;

    const existingUserTrip = userTrips.find((ut) => ut.user_id === userId);
    newTakenSeats += nbPeople;
    if (existingUserTrip) {
      newTakenSeats -= existingUserTrip.nb_people;
      this.logger.verbose(
        `User already joined this trip. Updating number of taken seats to ${newTakenSeats}`,
      );
    }

    if (newTakenSeats > trip.nb_seats_car) {
      throw new BadRequestException(
        `Not enough seats. Max seats: ${trip.nb_seats_car}, taken seats: ${takenSeats}`,
      );
    }

    //await trip.$add('users', user, {
    //  through: { nb_people: newTakenSeats },
    //});
    await trip.$add('users', user, {
      through: { nb_people: nbPeople },
    });
    return this.tripModel.findByPk(tripId, {
      include: this.userModel,
    });
  }

  async leaveTrip(tripId: number, userId: string): Promise<TripEntity> {
    const trip = await this.tripModel.findByPk(tripId);
    if (!trip) {
      throw new NotFoundException('Trip not found');
    }
    const rainbowUser = await this.rainbow.contacts.getContactById(userId);
    if (!rainbowUser) {
      throw new NotFoundException('User not found');
    }
    const userTrip = await this.userTripModel.findOne({
      where: { user_id: userId, trip_id: tripId },
    });
    if (!userTrip) {
      throw new BadRequestException('User did not join this trip');
    }
    await userTrip.destroy();
    return this.tripModel.findByPk(tripId, {
      include: this.userModel,
    });
  }

  async findUpcomingTripsByUser(
    userId: string,
    fromDate: Date,
    toDate?: Date,
  ): Promise<TripEntity[]> {
    const whereClause = {
      date: {
        [Op.gte]: fromDate,
      },
    };
    if (toDate) {
      whereClause.date[Op.lte] = toDate;
    }

    return this.tripModel.findAll({
      where: whereClause,
      include: [
        {
          model: UserEntity,
          where: {
            user_id: userId,
          },
        },
        {
          model: CommunityEntity,
        },
      ],
    });
  }
}
