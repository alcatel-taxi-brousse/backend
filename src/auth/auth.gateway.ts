import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Logger, Optional, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { NotFoundError } from '../common/errors/not-found.error';

@WebSocketGateway()
@UsePipes(ValidationPipe)
export class AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly authService: AuthService,
    @Optional()
    private readonly logger = new Logger(AuthGateway.name),
  ) {}

  handleDisconnect(client: any) {
    this.logger.verbose(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: any, data: string) {
    this.logger.verbose(`Client connected: ${client.id} data: ${data}`);
  }

  @SubscribeMessage('login')
  async login(@MessageBody() dto: LoginDto) {
    const { email, password } = dto;
    await this.authService.login(email, password);
  }

  @SubscribeMessage('logout')
  async logout(@MessageBody() email: string) {
    try {
      await this.authService.logout(email);
    } catch (e) {
      if (e instanceof NotFoundError) {
        return e;
      }
      this.logger.error(e.message);
    }
  }
}
