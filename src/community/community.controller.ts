import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommunityService } from './services/community.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommunityCreationDto } from './dtos/community-creation.dto';
import { Community } from './models/community.model';
import { TripEntity } from '../common/entities/trip.entity';
import { CreateTripDto } from './dtos/create-trip.dto';
import { TripService } from './services/trip.service';

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
  getCommunities(): Community[] {
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

  @Get('trips')
  findAll(): Promise<TripEntity[]> {
    return this.tripService.findAll();
  }

  @Get('trips/:id')
  findOne(@Param('id') id: string): Promise<TripEntity> {
    return this.tripService.findOne(id);
  }

  @Post(':id/trips')
  create(@Body() createTripDto: CreateTripDto): Promise<TripEntity> {
    return this.tripService.create(createTripDto);
  }

  /**
   * Get all trips for a specific group
   * @param id
   */
  @Get(':id/trips')
  findTripsByGroup(@Param('id') id: string): Promise<TripEntity[]> {
    return this.communityService.findTripsByGroup(id);
  }
}
