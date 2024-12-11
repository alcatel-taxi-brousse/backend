import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommunityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  withHistory: boolean = false;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsBoolean()
  private: boolean = false;
}
