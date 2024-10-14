import { Injectable, Logger, Optional } from '@nestjs/common';
import { RainbowService } from '../common/services/rainbow.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly rainbowService: RainbowService,
    @Optional()
    private readonly logger = new Logger(AuthService.name),
  ) {}

  async login(login: string, password: string) {
    const sdk = await this.rainbowService.createSDK(login, password);
    this.logger.verbose(`User ${sdk.connectedUser.id} logged in`);
  }

  async logout(login: string) {
    await this.rainbowService.closeSDK(login);
    this.logger.verbose(`${login} disconnected`);
  }
}
