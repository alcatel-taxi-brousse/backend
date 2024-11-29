import { Injectable, Logger, Optional } from '@nestjs/common';
import { Trip } from '../../db/entities/trip.entity';
import { CreateTripDto } from '../dtos/create-trip.dto';

@Injectable()
export class TripService {
  constructor(
    @Optional()
    private readonly logger = new Logger(TripService.name),
  ) {}

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    this.logger.verbose(
      `Creating new trip from ${createTripDto.start_location}`,
    );

    const trip = new Trip();
    Object.assign(trip, createTripDto);

    await trip.save();
    this.logger.verbose(`Created trip with id ${trip.trip_id}`);

    return trip;
  }

  async findAll(): Promise<Trip[]> {
    return Trip.findAll({
      include: ['users', 'group'],
    });
  }

  async findOne(id: string): Promise<Trip> {
    return Trip.findByPk(id, {
      include: ['users', 'group'],
    });
  }
}
