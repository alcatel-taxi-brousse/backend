import { Injectable, Logger, Optional } from '@nestjs/common';
import { NodeSDK as RainbowSDK } from 'rainbow-node-sdk/lib/NodeSDK';
import { CommunityCreationDto } from './community-creation.dto';
import { Community } from './models/community.model';

@Injectable()
export class CommunityService {
  constructor(
    private readonly rainbow: RainbowSDK,
    @Optional()
    private readonly logger = new Logger(CommunityService.name),
  ) {}

  getCommunities(): Community[] {
    this.logger.verbose('Getting all community');
    return this.rainbow.bubbles.getAllBubbles();
  }

  async createCommunity(dto: CommunityCreationDto): Promise<Community> {
    const { name, description, withHistory } = dto;
    const created = (await this.rainbow.bubbles.createBubble(
      name,
      description,
      withHistory,
    )) as Community;
    this.logger.verbose(`Created community ${created.name}`);
    return created;
  }
}
