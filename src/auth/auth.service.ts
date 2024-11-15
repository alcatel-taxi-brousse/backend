import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { lastValueFrom } from 'rxjs';
import { LoginResponse } from './login-response.model';
import { ConfigService, ConfigType } from '@nestjs/config';
import { AppConfig } from '../app.config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<ConfigType<typeof AppConfig>>,
    private readonly httpService: HttpService,
  ) {}

  private readonly url = `https://${this.configService.get('rainbow.host', { infer: true })}/api/rainbow/authentication/v1.0`;

  async login(email: string, password: string): Promise<LoginResponse> {
    const id = this.configService.get('rainbow.appID', { infer: true });
    const secret = this.configService.get('rainbow.appSecret', { infer: true });

    const auth = this.encryptUser(email, password);
    const appAuth = this.encryptApplication(id, secret, password);

    const response = await lastValueFrom(
      this.httpService.get<LoginResponse>(`${this.url}/login`, {
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
  }

  async checkTokenValidity(token: string) {
    const response = await lastValueFrom(
      this.httpService.get<{ status: string }>(`${this.url}/validator`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }),
    );
    return response.data;
  }

  private encryptApplication(
    id: string,
    secret: string,
    password: string,
  ): string {
    const toEncrypt = secret + password;
    const encrypted = createHash('sha-256').update(toEncrypt).digest('hex');
    return btoa(id + ':' + encrypted);
  }

  private encryptUser(email: string, password: string): string {
    return btoa(email + ':' + password);
  }
}
