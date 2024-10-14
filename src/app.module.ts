import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './app.config';
import { AuthModule } from './auth/auth.module';
import { RainbowService } from './common/services/rainbow.service';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [AppConfig] }),
  ],
  controllers: [],
  providers: [RainbowService],
})
export class AppModule {}
