import { Controller, Get } from '@nestjs/common';
import { BubblesService } from './bubbles.service';
import { Bubble } from 'rainbow-node-sdk/lib/common/models/Bubble';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('bubbles')
@ApiBearerAuth()
@Controller('bubbles')
export class BubblesController {
  constructor(private readonly appService: BubblesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all bubbles in the instance' })
  getBubbles(): Bubble[] {
    return this.appService.getBubbles();
  }
}
