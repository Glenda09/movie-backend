import { IsInt, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  scheduleId: number;

  @IsString()
  seatNumber: string;
}
