import {
  Body,
  Controller,
  Logger,
  Optional,
  Post,
  UseFilters,
} from '@nestjs/common';
import { LoginDto } from './login.dto';
import { AuthService } from './auth.service';
import { Public } from '../common/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { LoginResponse } from './login-response.model';
import { RainbowAuthHttpFilter } from '../common/filters/rainbow-auth-http.filter';

@ApiTags('auth')
@Controller('auth')
@UseFilters(RainbowAuthHttpFilter)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Optional()
    private readonly logger = new Logger(AuthController.name),
  ) {}

  /**
   * Log a user in and return data containing their JWT token
   */
  @Public()
  @Post()
  async login(@Body() dto: LoginDto): Promise<LoginResponse> {
    const { email, password } = dto;
    const data = await this.authService.login(email, password);
    this.logger.verbose(`User ${data.loggedInUser.id} logged in`);
    return data;
  }
}
