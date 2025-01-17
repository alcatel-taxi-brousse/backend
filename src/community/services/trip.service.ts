import {
  BadRequestException,
  ConflictException,
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

  async findAll(): Promise<TripEntity[]> {
    return this.tripModel.findAll();
  }

  async findOne(id: number): Promise<TripEntity> {
    return this.tripModel.findByPk(id, {
      include: ['users', 'community'],
    });
  }

  async joinTrip(
    tripId: string,
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
    const newTakenSeats = takenSeats + nbPeople;
    if (newTakenSeats > trip.nb_seats_car) {
      throw new BadRequestException(
        `Not enough seats. Max seats: ${trip.nb_seats_car}, taken seats: ${takenSeats}`,
      );
    }

    if (
      await this.userTripModel.findOne({
        where: { user_id: userId, trip_id: tripId },
      })
    ) {
      throw new ConflictException('User already joined this trip');
    }

    await trip.$add('users', user, {
      through: { nb_people: newTakenSeats },
    });
    return this.tripModel.findByPk(tripId, {
      include: this.userModel,
    });
  }

  async leaveTrip(tripId: string, userId: string): Promise<TripEntity> {
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
}
