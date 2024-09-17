import { Injectable } from '@nestjs/common';
import { NodeSDK as RainbowSDK } from 'rainbow-node-sdk/lib/NodeSDK';
import { Bubble } from 'rainbow-node-sdk/lib/common/models/Bubble';

@Injectable()
export class AppService {
  constructor(private readonly rainbow: RainbowSDK) {}

  getBubbles(): Bubble[] {
    return this.rainbow.bubbles.getAllBubbles();
  }
}
