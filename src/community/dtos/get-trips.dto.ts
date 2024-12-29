import { IsOptional, IsDateString } from 'class-validator';

export class GetTripsDto {
  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;
}