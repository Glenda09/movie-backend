import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateMovieDto) {
    return this.prisma.movie.create({ data: dto });
  }

  findAll() {
    return this.prisma.movie.findMany();
  }

  findOne(id: number) {
    return this.prisma.movie.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdateMovieDto) {
    const exists = await this.prisma.movie.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Película no encontrada');

    return this.prisma.movie.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    const exists = await this.prisma.movie.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Película no encontrada');

    return this.prisma.movie.delete({ where: { id } });
  }
}
