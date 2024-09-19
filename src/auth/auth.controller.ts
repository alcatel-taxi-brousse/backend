import { Body, Controller, Logger, Optional, Post } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { AuthService } from './auth.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Optional()
    private readonly logger = new Logger(AuthController.name),
  ) {}

  @Public()
  @Post()
  async login(@Body() dto: LoginDto) {
    const { email, password } = dto;
    const data = await this.authService.login(email, password);
    this.logger.verbose(`User ${data.loggedInUser.id} logged in`);
    return data;
  }
}
