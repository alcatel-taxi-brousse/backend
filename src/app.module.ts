import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NodeSDK as RainbowSDK } from 'rainbow-node-sdk/lib/NodeSDK';
import { rainbowConfig } from './rainbow-config';
import * as process from 'node:process';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: RainbowSDK,
      useFactory: async () => {
        const sdk = new RainbowSDK({
          ...rainbowConfig,
          rainbow: {
            host: process.env.RAINBOW_HOST || 'sandbox',
          },
          credentials: {
            login: process.env.RAINBOW_LOGIN || 'login',
            password: process.env.RAINBOW_PASSWORD || 'password',
          },
          application: {
            appID: process.env.RAINBOW_APP_ID || 'appID',
            appSecret: process.env.RAINBOW_APP_SECRET || 'secret',
          },
        });
        await sdk.start();
        return sdk;
      },
    },
  ],
})
export class AppModule {}
