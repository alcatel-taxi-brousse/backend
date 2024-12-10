import {
  Injectable,
  Logger,
  NotFoundException,
  Optional,
} from '@nestjs/common';
import { TripEntity } from '../../common/entities/trip.entity';
import { CreateTripDto } from '../dtos/create-trip.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CommunityEntity } from '../../common/entities/community.entity';

@Injectable()
export class TripService {
  constructor(
    @InjectModel(TripEntity)
    private readonly tripModel: typeof TripEntity,
    @InjectModel(CommunityEntity)
    private readonly communityModel: typeof CommunityEntity,
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
}
