import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class JoinTripDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  nbPeople: number;
}
