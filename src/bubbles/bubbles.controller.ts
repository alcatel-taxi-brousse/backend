import { Controller, Get } from '@nestjs/common';
import { BubblesService } from './bubbles.service';
import { Bubble } from 'rainbow-node-sdk/lib/common/models/Bubble';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('bubbles')
@ApiBearerAuth()
@Controller('bubbles')
export class BubblesController {
  constructor(private readonly appService: BubblesService) {}

  /**
   * Get all bubbles in the instance
   */
  @Get()
  getBubbles(): Bubble[] {
    return this.appService.getBubbles();
  }
}
