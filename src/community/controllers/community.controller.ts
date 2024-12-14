import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommunityService } from '../services/community.service';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { CreateCommunityDto } from '../dtos/create-community.dto';
import { Community } from '../models/community.model';
import { UserId } from '../../common/decorators/user.decorator';
import { Sequelize } from 'sequelize-typescript';

@ApiTags('communities')
@ApiBearerAuth()
@Controller('communities')
export class CommunityController {
  constructor(
    private readonly communityService: CommunityService,
    private readonly sequelize: Sequelize,
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
  async searchCommunities(
    @Query('search') search: string,
  ): Promise<Community[]> {
    const searchFormatted = (search ?? '').trim().toLowerCase();
    // Only search by id or join_id if the community is private
    const [results] = await this.sequelize.query(
      `
      SELECT * FROM "Community"
      WHERE
        ("private" = true AND (
          "community_id" = :exactSearch
          OR CAST("join_id" AS TEXT) = :exactSearch
        ))
        OR ("private" = false AND (
          LOWER("community_id") LIKE :search
          OR LOWER(CAST("join_id" AS TEXT)) LIKE :search
          OR LOWER("name") LIKE :search
          OR LOWER("description") LIKE :search
          OR LOWER("destination") LIKE :search
        ))
    `,
      {
        replacements: {
          search: `%${searchFormatted}%`,
          exactSearch: searchFormatted,
        },
      },
    );
    return results;
  }
}
