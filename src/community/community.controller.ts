import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommunityService } from './services/community.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommunityCreationDto } from './dtos/community-creation.dto';
import { Community } from './models/community.model';
import { TripEntity } from '../common/entities/trip.entity';
import { CreateTripDto } from './dtos/create-trip.dto';
import { TripService } from './services/trip.service';
import { UserId } from '../common/decorators/user.decorator';

@ApiTags('communities')
@ApiBearerAuth()
@Controller('communities')
export class CommunityController {
  constructor(
    private readonly communityService: CommunityService,
    private readonly tripService: TripService,
  ) {}

  /**
   * Get all communities in the instance
   */
  @Get()
  async getCommunities(): Promise<Community[]> {
    return this.communityService.getCommunities();
  }

  /**
   * Create a new community
   * @param dto
   */
  @Post()
  createCommunity(@Body() dto: CommunityCreationDto): Promise<Community> {
    return this.communityService.createCommunity(dto);
  }

  @Post(':communityId/join')
  joinCommunity(
    @Param('communityId') communityId: string,
    @UserId() userId: string,
  ): Promise<void> {
    return this.communityService.joinCommunity(communityId, userId);
  }

  /**
   * Get a specific trip in a community
   * @param tripId
   */
  @Get(':communityId/trips/:tripId')
  findOne(@Param('tripId') tripId: number): Promise<TripEntity> {
    return this.tripService.findOne(tripId);
  }

  /**
   * Create a new trip in a community
   * @param createTripDto
   * @param communityId
   * @param userId
   */
  @Post(':communityId/trips')
  create(
    @Body() createTripDto: CreateTripDto,
    @Param('communityId') communityId: string,
    @UserId() userId: string,
  ): Promise<TripEntity> {
    return this.tripService.create(userId, communityId, createTripDto);
  }

  /**
   * Get all trips for a specific group
   * @param communityId
   */
  @Get(':communityId/trips')
  findTripsByGroup(
    @Param('communityId') communityId: string,
  ): Promise<TripEntity[]> {
    return this.communityService.findTripsByCommunity(communityId);
  }
}
