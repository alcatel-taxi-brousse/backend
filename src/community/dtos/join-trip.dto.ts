import { IsInt, IsNotEmpty } from 'class-validator';

export class JoinTripDto {
  @IsNotEmpty()
  @IsInt()
  nbPeople: number;
}
