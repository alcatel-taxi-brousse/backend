import { Injectable, Logger, Optional } from '@nestjs/common';
import { NodeSDK as RainbowSDK } from 'rainbow-node-sdk/lib/NodeSDK';
import { Bubble } from 'rainbow-node-sdk/lib/common/models/Bubble';
import { BubbleCreationDto } from './bubble-creation.dto';

//FIXME: Use the SDK corresponding to the user's login
@Injectable()
export class BubblesService {
  constructor(
    private readonly rainbow: RainbowSDK,
    @Optional()
    private readonly logger = new Logger(BubblesService.name),
  ) {}

  getBubbles(): Bubble[] {
    this.logger.verbose('Getting all bubbles');
    return this.rainbow.bubbles.getAllBubbles();
  }

  async createBubble(dto: BubbleCreationDto): Promise<Bubble> {
    const { name, description, withHistory } = dto;
    const created = (await this.rainbow.bubbles.createBubble(
      name,
      description,
      withHistory,
    )) as Bubble;
    this.logger.verbose(`Created bubble ${created.name}`);
    return created;
  }
}
