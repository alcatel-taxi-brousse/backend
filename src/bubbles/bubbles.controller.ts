import { Controller, Get } from '@nestjs/common';
import { BubblesService } from './bubbles.service';
import { Bubble } from 'rainbow-node-sdk/lib/common/models/Bubble';

@Controller('bubbles')
export class BubblesController {
  constructor(private readonly appService: BubblesService) {}

  @Get()
  getBubbles(): Bubble[] {
    return this.appService.getBubbles();
  }
}
