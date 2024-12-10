import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { APP_FILTER } from '@nestjs/core';
import { RainbowAuthHttpFilter } from '../common/filters/rainbow-auth-http.filter';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: APP_FILTER, useClass: RainbowAuthHttpFilter },
  ],
  exports: [AuthService],
})
export class AuthModule {}
