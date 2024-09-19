import { HttpException, Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { lastValueFrom } from 'rxjs';
import { LoginResponse } from './login-response.model';
import { ConfigService, ConfigType } from '@nestjs/config';
import { AppConfig } from '../app.config';
import { HttpService } from '@nestjs/axios';
import { isAxiosError } from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<ConfigType<typeof AppConfig>>,
    private readonly httpService: HttpService,
  ) {}

  private readonly url = `https://${this.configService.get('rainbow.host', { infer: true })}/api/rainbow/authentication/v1.0/login`;

  async login(email: string, password: string) {
    const id = this.configService.get('rainbow.appID', { infer: true });
    const secret = this.configService.get('rainbow.appSecret', { infer: true });

    const auth = this.encryptUser(email, password);
    const appAuth = this.encryptApplication(id, secret, password);

    try {
      const response = await lastValueFrom(
        this.httpService.get<LoginResponse>(this.url, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic ${auth}`,
            'x-rainbow-client': 'sdk_node',
            'x-rainbow-client-id': id,
            'x-rainbow-app-auth': `Basic ${appAuth}`,
          },
        }),
      );
      return response.data;
    } catch (e) {
      if (isAxiosError(e)) {
        throw new HttpException(
          e.response.data.errorDetails,
          e.response.data.errorCode,
        );
      }
      throw e;
    }
  }

  encryptApplication(id: string, secret: string, password: string) {
    const toEncrypt = secret + password;
    const encrypted = createHash('sha-256').update(toEncrypt).digest('hex');
    return btoa(id + ':' + encrypted);
  }

  encryptUser(email: string, password: string) {
    return btoa(email + ':' + password);
  }
}
