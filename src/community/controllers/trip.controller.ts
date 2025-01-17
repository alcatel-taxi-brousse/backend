import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TripEntity } from '../../common/entities/trip.entity';
import { UserId } from '../../common/decorators/user.decorator';
import { JoinTripDto } from '../dtos/join-trip.dto';
import { CreateTripDto } from '../dtos/create-trip.dto';
import { CommunityService } from '../services/community.service';
import { TripService } from '../services/trip.service';

@ApiTags('trips')
@ApiBearerAuth()
@Controller('communities/:communityId/trips')
export class TripController {
  constructor(
    private readonly communityService: CommunityService,
    private readonly tripService: TripService,
  ) {}

  /**
   * Get all trips for a specific group
   * @param communityId
   */
  @Get()
  getMany(@Param('communityId') communityId: string): Promise<TripEntity[]> {
    return this.communityService.findTripsByCommunity(communityId);
  }

  /**
   * Get a specific trip in a community
   * @param tripId
   */
  @Get(':tripId')
  getOne(@Param('tripId') tripId: number): Promise<TripEntity> {
    return this.tripService.findOne(tripId);
  }

  /**
   * Create a new trip in a community
   * @param createTripDto
   * @param communityId
   * @param userId
   */
  @Post()
  create(
    @Body() createTripDto: CreateTripDto,
    @Param('communityId') communityId: string,
    @UserId() userId: string,
  ): Promise<TripEntity> {
    return this.tripService.create(userId, communityId, createTripDto);
  }

  @Post(':tripId/join')
  joinTrip(
    @Param('tripId') tripId: string,
    @UserId() userId: string,
    @Body() dto: JoinTripDto,
  ): Promise<TripEntity> {
    const { nbPeople } = dto;
    return this.tripService.joinTrip(tripId, userId, nbPeople);
  }

  @Delete(':tripId/leave')
  leaveTrip(
    @Param('tripId') tripId: string,
    @UserId() userId: string,
  ): Promise<TripEntity> {
    return this.tripService.leaveTrip(tripId, userId);
  }
}
