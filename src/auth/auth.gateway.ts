import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import {
  Logger,
  Optional,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { NotFoundError } from '../common/errors/not-found.error';
import { Socket } from 'socket.io';
import { WsValidationFilter } from '../common/filters/ws-validation.filter';

@WebSocketGateway()
@UsePipes(ValidationPipe)
@UseFilters(new WsValidationFilter())
export class AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly authService: AuthService,
    @Optional()
    private readonly logger = new Logger(AuthGateway.name),
  ) {}

  handleDisconnect(client: Socket) {
    this.logger.verbose(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, data: string) {
    this.logger.verbose(`Client connected: ${client.id}`);
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
