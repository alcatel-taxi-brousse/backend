import { Injectable, Logger, Optional } from '@nestjs/common';
import { TripEntity } from '../../common/entities/trip.entity';
import { CreateTripDto } from '../dtos/create-trip.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TripService {
  constructor(
    @InjectModel(TripEntity)
    private readonly tripModel: typeof TripEntity,
    @Optional()
    private readonly logger = new Logger(TripService.name),
  ) {}

  async create(createTripDto: CreateTripDto): Promise<TripEntity> {
    this.logger.verbose(
      `Creating new trip from ${createTripDto.start_location}`,
    );
    return this.tripModel.create({ ...createTripDto });
  }

  async findAll(): Promise<TripEntity[]> {
    return this.tripModel.findAll();
  }

  async findOne(id: string): Promise<TripEntity> {
    return this.tripModel.findByPk(id, {
      include: ['users', 'group'],
    });
  }
}
