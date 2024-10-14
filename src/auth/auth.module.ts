import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { APP_FILTER } from '@nestjs/core';
import { RainbowHttpFilter } from '../common/filters/rainbow-http.filter';
import { AuthGateway } from './auth.gateway';
import { RainbowService } from '../common/services/rainbow.service';

@Module({
  imports: [HttpModule],
  providers: [
    AuthService,
    RainbowService,
    { provide: APP_FILTER, useClass: RainbowHttpFilter },
    AuthGateway,
  ],
  exports: [AuthService],
})
export class AuthModule {}
