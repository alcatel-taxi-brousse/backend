import { Global, Logger, Module } from '@nestjs/common';
import { NodeSDK as RainbowSDK } from 'rainbow-node-sdk/lib/NodeSDK';
import { ConfigService, ConfigType } from '@nestjs/config';
import { AppConfig } from '../app.config';
import { config as defaultRainbowConfig } from 'rainbow-node-sdk/lib/config/config';

@Global()
@Module({
  providers: [
    {
      provide: RainbowSDK,
      useFactory: async (
        configService: ConfigService<ConfigType<typeof AppConfig>>,
      ): Promise<RainbowSDK> => {
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
  exports: [RainbowSDK],
})
export class CommonModule {}
