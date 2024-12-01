import {
  Injectable,
  Logger,
  NotFoundException,
  Optional,
} from '@nestjs/common';
import { NodeSDK as RainbowSDK } from 'rainbow-node-sdk/lib/NodeSDK';
import { CommunityCreationDto } from '../dtos/community-creation.dto';
import { Community } from '../models/community.model';
import { TripEntity } from '../../common/entities/trip.entity';
import { CommunityEntity } from '../../common/entities/community.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class CommunityService {
  constructor(
    private readonly rainbow: RainbowSDK,
    @InjectModel(CommunityEntity)
    private readonly communityModel: typeof CommunityEntity,
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

  async createCommunity(dto: CommunityCreationDto): Promise<Community> {
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
        model: TripEntity,
        through: { attributes: [] },
      },
    });

    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }
    //FIXME
    return group.trips;
  }
}
