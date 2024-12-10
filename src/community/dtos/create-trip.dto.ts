import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTripDto {
  @IsNotEmpty()
  @IsString()
  start_location: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  frequence: string;

  @IsNotEmpty()
  @IsNumber()
  nb_seats_car: number;

  @IsString()
  description: string;
}
