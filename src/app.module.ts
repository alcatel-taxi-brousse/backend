import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NodeSDK as RainbowSDK } from 'rainbow-node-sdk/lib/NodeSDK';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { AppConfig } from './app.config';
import { config as defaultRainbowConfig } from 'rainbow-node-sdk/lib/config/config';
import { AppLogger } from './common/services/app-logger.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [AppConfig] })],
  controllers: [AppController],
  providers: [
    AppService,
    AppLogger,
    {
      provide: RainbowSDK,
      useFactory: async (
        service: ConfigService<ConfigType<typeof AppConfig>>,
      ) => {
        const logger = new Logger('RainbowSDK');
        const appConfig = service.get('rainbow', { infer: true });
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
