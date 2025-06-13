import { IsDateString, IsInt } from 'class-validator';

export class CreateScheduleDto {
  @IsInt()
  movieId: number;

  @IsDateString()
  date: string; // formato ISO

  @IsInt()
  capacity: number;
}
