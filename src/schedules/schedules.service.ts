import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateScheduleDto) {
    return this.prisma.schedule.create({
      data: {
        movieId: dto.movieId,
        date: new Date(dto.date),
        capacity: dto.capacity,
      },
    });
  }

  findAll() {
    return this.prisma.schedule.findMany({
      include: {
        movie: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.schedule.findUnique({
      where: { id },
      include: { movie: true },
    });
  }

  async update(id: number, dto: UpdateScheduleDto) {
    const exists = await this.prisma.schedule.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Horario no encontrado');

    return this.prisma.schedule.update({
      where: { id },
      data: {
        movieId: dto.movieId,
        date: dto.date ? new Date(dto.date) : undefined,
        capacity: dto.capacity,
      },
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.schedule.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Horario no encontrado');

    return this.prisma.schedule.delete({ where: { id } });
  }
}