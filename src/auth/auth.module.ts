import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { APP_FILTER } from '@nestjs/core';
import { RainbowHttpFilter } from '../common/filters/rainbow-http.filter';
import { RainbowService } from '../common/services/rainbow.service';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    RainbowService,
    { provide: APP_FILTER, useClass: RainbowHttpFilter },
  ],
  exports: [AuthService],
})
export class AuthModule {}
