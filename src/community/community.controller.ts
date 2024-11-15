import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommunityService } from './community.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommunityCreationDto } from './community-creation.dto';
import { Community } from './models/community.model';

@ApiTags('communities')
@ApiBearerAuth()
@Controller('communities')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

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
}
