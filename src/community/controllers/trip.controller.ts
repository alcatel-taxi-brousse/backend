import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { TripEntity } from '../../common/entities/trip.entity';
import { UserId } from '../../common/decorators/user.decorator';
import { JoinTripDto } from '../dtos/join-trip.dto';
import { CreateTripDto } from '../dtos/create-trip.dto';
import { CommunityService } from '../services/community.service';
import { TripService } from '../services/trip.service';
import { SequelizeFilter } from '../../common/filters/sequelize.filter';
import { GetTripsDto } from '../dtos/get-trips.dto';

@ApiTags('trips')
@ApiBearerAuth()
@UseFilters(SequelizeFilter)
@Controller()
export class TripController {
  constructor(
    private readonly communityService: CommunityService,
    private readonly tripService: TripService,
  ) {}

  /**
   * Get all trips for a specific group
   * @param communityId
   */
  @Get('communities/:communityId/trips')
  getMany(@Param('communityId') communityId: string): Promise<TripEntity[]> {
    return this.communityService.findTripsByCommunity(communityId);
  }

  /**
   * Get a specific trip in a community
   * @param tripId
   */
  @Get('communities/:communityId/trips/:tripId')
  getOne(@Param('tripId') tripId: number): Promise<TripEntity> {
    return this.tripService.findOne(tripId);
  }

  /**
   * Create a new trip in a community
   * @param createTripDto
   * @param communityId
   * @param userId
   */
  @Post('communities/:communityId/trips')
  create(
    @Body() createTripDto: CreateTripDto,
    @Param('communityId') communityId: string,
    @UserId() userId: string,
  ): Promise<TripEntity> {
    return this.tripService.create(userId, communityId, createTripDto);
  }

  @Post('communities/:communityId/trips/:tripId/join')
  joinTrip(
    @Param('tripId') tripId: string,
    @UserId() userId: string,
    @Body() dto: JoinTripDto,
  ): Promise<TripEntity> {
    return this.tripService.joinTrip(tripId, userId, dto.nbPeople);
  }

  /**
   * Get upcoming trips for the logged-in user
   * @param userId
   * @param from
   * @param to
   */
  @Get('trips/me')
  async getUpcomingTrips(
    @UserId() userId: string,
    @Query() query: GetTripsDto,
  ): Promise<TripEntity[]> {
    const fromDate = query.from ? new Date(query.from) : new Date();
    const toDate = query.to ? new Date(query.to) : undefined;
    return await this.tripService.findUpcomingTripsByUser(
      userId,
      fromDate,
      toDate,
    );
  }
}