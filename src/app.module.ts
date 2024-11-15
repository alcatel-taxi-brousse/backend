import { CommunityController } from './community/community.controller';
import { CommunityService } from './community/community.service';
import { Logger, Module } from '@nestjs/common';
import { NodeSDK as RainbowSDK } from 'rainbow-node-sdk/lib/NodeSDK';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { AppConfig } from './app.config';
import { config as defaultRainbowConfig } from 'rainbow-node-sdk/lib/config/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { UserController } from './user/user.controller';
import { GroupController } from './group/group.controller';
import { TripController } from './trip/trip.controller';
import { DatabaseModule } from './db/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [AppConfig] }),
    AuthModule,
    DatabaseModule,
  ],
  controllers: [
    CommunityController,
    UserController,
    GroupController,
    TripController,
  ],
  providers: [
    CommunityService,
    { provide: APP_GUARD, useClass: AuthGuard },
    {
      provide: RainbowSDK,
      useFactory: async (
        configService: ConfigService<ConfigType<typeof AppConfig>>,
      ) => {
        const logger = new Logger('RainbowSDK');
        const appConfig = configService.get('rainbow', { infer: true });
        const rainbowConfig = {
          ...defaultRainbowConfig,
          rainbow: {
            host: appConfig.host,
          },
          credentials: {
            login: appConfig.login,
            password: appConfig.password,
          },
          application: {
            appID: appConfig.appID,
            appSecret: appConfig.appSecret,
          },
          webinar: {
            start_up: false,
          },
          rbvoice: {
            start_up: false,
          },
          rpcoverxmpp: {
            start_up: false,
          },
        };

        const sdk = new RainbowSDK(rainbowConfig);
        await sdk.start();
        logger.log(`Connected to ${appConfig.host}`);
        return sdk;
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
