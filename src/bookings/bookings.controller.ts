import { Controller, Post, Body, UseGuards, Request, Get, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateBookingDto) {
    return this.bookingsService.create(req.user.userId, dto);
  }

  @Get()
  findMyBookings(@Request() req) {
    return this.bookingsService.findUserBookings(req.user.userId);
  }

  @Delete(':id')
  cancel(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.bookingsService.cancel(id, req.user.userId);
  }
}
