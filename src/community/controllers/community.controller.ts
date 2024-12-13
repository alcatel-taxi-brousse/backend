import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommunityService } from '../services/community.service';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { CreateCommunityDto } from '../dtos/create-community.dto';
import { Community } from '../models/community.model';
import { UserId } from '../../common/decorators/user.decorator';

@ApiTags('communities')
@ApiBearerAuth()
@Controller('communities')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

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
  createCommunity(@Body() dto: CreateCommunityDto): Promise<Community> {
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
   * Search communities by name/description/id
   * (search only by id if the community is private)
   * @param search
   */
  @Get('search')
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search query for communities',
  })
  searchCommunities(@Query('search') search: string): Promise<Community[]> {
    return this.communityService.searchCommunities(search);
  }
}
