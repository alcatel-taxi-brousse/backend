import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  Optional,
} from '@nestjs/common';
import { NodeSDK as RainbowSDK } from 'rainbow-node-sdk/lib/NodeSDK';
import { CreateCommunityDto } from '../dtos/create-community.dto';
import { Community } from '../models/community.model';
import { TripEntity } from '../../common/entities/trip.entity';
import { CommunityEntity } from '../../common/entities/community.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { code } from 'rainbow-node-sdk/lib/common/ErrorManager';
import { UserEntity } from '../../common/entities/user.entity';

@Injectable()
export class CommunityService {
  constructor(
    private readonly rainbow: RainbowSDK,
    @InjectModel(CommunityEntity)
    private readonly communityModel: typeof CommunityEntity,
    @InjectModel(TripEntity)
    private readonly tripModel: typeof TripEntity,
    @InjectModel(UserEntity)
    private readonly userModel: typeof UserEntity,
    @Optional()
    private readonly logger = new Logger(CommunityService.name),
  ) {}

  async getCommunities(): Promise<Community[]> {
    this.logger.verbose('Getting all community');
    const bubbles = this.rainbow.bubbles.getAllBubbles();
    const ids: string[] = bubbles.map((bubble) => bubble.id);
    const entities = await this.communityModel.findAll({
      where: { community_id: { [Op.in]: ids } },
    });
    return bubbles.map((bubble) => {
      const entity = entities.find((e) => e.community_id === bubble.id);
      delete entity?.community_id;
      return !!entity ? { ...bubble, ...entity.dataValues } : bubble;
    });
  }

  async getCommunitiesApp(): Promise<Community[]> {
    this.logger.verbose('Getting all community in the app');
    const bubbles = this.rainbow.bubbles.getAllBubbles();
    const ids: string[] = bubbles.map((bubble) => bubble.id);
    const entities = await this.communityModel.findAll({
      where: { community_id: { [Op.in]: ids } },
    });

    // Filter bubbles, if exists in the app
    const filtered_bubbles = bubbles.filter((bubble) =>
      entities.some((entity) => entity.community_id === bubble.id),
    );
    // Add app data
    return filtered_bubbles.map((bubble) => {
      const entity = entities.find((e) => e.community_id === bubble.id);
      delete entity?.community_id;
      return !!entity ? { ...bubble, ...entity.dataValues } : bubble;
    });
  }

  async createCommunity(dto: CreateCommunityDto): Promise<Community> {
    const { name, description, withHistory, destination } = dto;
    const bubble = (await this.rainbow.bubbles.createBubble(
      name,
      description,
      withHistory,
    )) as Community;
    const entity = await this.communityModel.create({
      community_id: bubble.id,
      name: bubble.name,
      description,
      destination: destination,
      private: dto.private,
      join_id: null,
    });
    delete entity.community_id;
    this.logger.verbose(`Created community ${bubble.name}`);
    return { ...bubble, ...entity.dataValues };
  }

  async findTripsByCommunity(id: string): Promise<TripEntity[]> {
    this.logger.verbose(`Fetching trips for group with id ${id}`);
    const group = await this.communityModel.findByPk(id, {
      include: {
        model: this.tripModel,
        include: [{ model: this.userModel }],
      },
    });
    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }
    return group.trips;
  }

  async joinCommunity(communityId: string, userId: string): Promise<void> {
    const bubble = await this.rainbow.bubbles.getBubbleById(communityId);
    const contact = await this.rainbow.contacts.getContactById(userId);
    try {
      await this.rainbow.bubbles.inviteContactToBubble(
        contact,
        bubble,
        false, // Not as moderator
        false, // Add directly to the bubble without invitation
      );
    } catch (e) {
      if (e.code === code.ERRORBADREQUEST) {
        throw new BadRequestException(
          'Failed to join the group. User may already be a member',
        );
      }
      throw e;
    }
  }
}
