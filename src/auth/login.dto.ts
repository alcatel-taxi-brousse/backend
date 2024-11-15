import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  /**
   * The email used on Rainbow to login
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
