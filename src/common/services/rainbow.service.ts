import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { NodeSDK as RainbowSDK } from 'rainbow-node-sdk/lib/NodeSDK';
import { config as defaultRainbowConfig } from 'rainbow-node-sdk/lib/config/config';
import { ConfigService, ConfigType } from '@nestjs/config';
import { AppConfig } from '../../app.config';
import { NotFoundError } from '../errors/not-found.error';

@Injectable()
export class RainbowService implements OnApplicationShutdown {
  private sdks: Map<string, RainbowSDK> = new Map();

  constructor(
    private readonly configService: ConfigService<ConfigType<typeof AppConfig>>,
  ) {}

  onApplicationShutdown() {
    this.sdks.forEach((sdk) => sdk.stop());
  }

  async createSDK(login: string, password: string): Promise<RainbowSDK> {
    const appConfig = this.configService.get('rainbow', { infer: true });
    const rainbowConfig = {
      ...defaultRainbowConfig,
      rainbow: {
        host: appConfig.host,
      },
      credentials: {
        login,
        password,
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
    this.sdks.set(login, sdk);
    return sdk;
  }

  async getSDK(login: string) {
    if (!this.sdks.has(login)) {
      throw new NotFoundError(`No SDK found for ${login}`);
    }
    return this.sdks.get(login);
  }

  async closeSDK(login: string) {
    if (!this.sdks.has(login)) {
      throw new NotFoundError(`No SDK found for ${login}`);
    }
    const sdk = this.sdks.get(login);
    await sdk.stop();
    this.sdks.delete(login);
  }
}
