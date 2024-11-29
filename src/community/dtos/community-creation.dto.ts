import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CommunityCreationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  withHistory: boolean = false;
}
