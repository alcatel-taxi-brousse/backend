import { Injectable, Logger, Optional } from '@nestjs/common';
import { NodeSDK as RainbowSDK } from 'rainbow-node-sdk/lib/NodeSDK';
import { Bubble } from 'rainbow-node-sdk/lib/common/models/Bubble';

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
}
