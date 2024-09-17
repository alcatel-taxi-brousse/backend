import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Bubble } from 'rainbow-node-sdk/lib/common/models/Bubble';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getBubbles(): Bubble[] {
    return this.appService.getBubbles();
  }
}
