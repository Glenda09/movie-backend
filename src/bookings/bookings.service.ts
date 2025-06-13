import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBookingDto } from '../bookings/dto/create-booking.dto';
@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateBookingDto) {
    const { scheduleId, seatNumber } = dto;

    const existing = await this.prisma.booking.findUnique({
      where: {
        scheduleId_seatNumber: {
          scheduleId,
          seatNumber,
        },
      },
    });

    if (existing) {
      throw new ConflictException('El asiento ya está reservado');
    }

    return this.prisma.booking.create({
      data: {
        userId,
        scheduleId,
        seatNumber,
      },
    });
  }

  async findUserBookings(userId: number) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: { schedule: { include: { movie: true } } },
    });
  }

  async cancel(id: number, userId: number) {
    const booking = await this.prisma.booking.findUnique({ where: { id } });
    if (!booking || booking.userId !== userId) throw new ConflictException('No autorizado o no encontrado');

    return this.prisma.booking.delete({ where: { id } });
  }
}
