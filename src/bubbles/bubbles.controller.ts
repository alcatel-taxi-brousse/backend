import { Body, Controller, Get, Post } from '@nestjs/common';
import { BubblesService } from './bubbles.service';
import { Bubble } from 'rainbow-node-sdk/lib/common/models/Bubble';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BubbleCreationDto } from './bubble-creation.dto';

@ApiTags('bubbles')
@ApiBearerAuth()
@Controller('bubbles')
export class BubblesController {
  constructor(private readonly bubblesService: BubblesService) {}

  /**
   * Get all bubbles in the instance
   */
  @Get()
  getBubbles(): Bubble[] {
    return this.bubblesService.getBubbles();
  }

  /**
   * Create a new bubble
   * @param dto
   */
  @Post()
  createBubble(@Body() dto: BubbleCreationDto): Promise<Bubble> {
    return this.bubblesService.createBubble(dto);
  }
}
