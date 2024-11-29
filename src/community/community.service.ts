import { Injectable, Logger, Optional } from '@nestjs/common';
import { NodeSDK as RainbowSDK } from 'rainbow-node-sdk/lib/NodeSDK';
import { CommunityCreationDto } from './community-creation.dto';
import { Community } from './models/community.model';
import { Group } from 'src/db/entities/group.entity';

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
  
    try {
      const created = (await this.rainbow.bubbles.createBubble(
        name,
        description,
        withHistory,
      )) as Community;
  
      this.logger.verbose(`Created community on Rainbow: ${created.name}`);
  
      const dataToInsert = {
        name: created.name,
        description: description || '', 
        destination: '', 
        private: false, 
        join_id: Math.floor(Math.random() * 1000000),
      };
      this.logger.verbose(`Data to insert into Group: ${JSON.stringify(dataToInsert)}`);
  
      const savedGroup = await Group.create(dataToInsert);

      this.logger.verbose('Synchronizing communities from Rainbow to Group table');
  
      const communities = await this.rainbow.bubbles.getAllBubbles();
    
      for (const community of communities) {
        const existingGroup = await Group.findOne({ where: { name: community.name } });
    
        if (!existingGroup) {
          await Group.create({
            name: community.name,
            description: community.topic || 'test',
            destination: 'test', 
            private: false,
            join_id: Math.floor(Math.random() * 1000000), 
          });
          this.logger.verbose(`Synchronized community to Group table: ${community.name}`);
        }
      }
  
      this.logger.verbose(`Synchronized community to Group table: ${savedGroup.name}`);
      return created;
    } catch (error) {
      this.logger.error(`Error during community creation: ${error.message}`);
      throw error;
    }

    
  }

  async syncCommunitiesToGroups(): Promise<void> {
    this.logger.verbose('Synchronizing communities from Rainbow to Group table');
  
    const communities = await this.rainbow.bubbles.getAllBubbles();
  
    for (const community of communities) {
      const existingGroup = await Group.findOne({ where: { name: community.name } });
  
      if (!existingGroup) {
        await Group.create({
          name: community.name,
          description: community.topic || 'test',
          destination: 'test',
          private: false,
          join_id: Math.floor(Math.random() * 1000000),
        });
        this.logger.verbose(`Synchronized community to Group table: ${community.name}`);
      }
    }
  }
}
