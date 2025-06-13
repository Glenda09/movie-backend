import {
    Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe
  } from '@nestjs/common';
  import { MoviesService } from './movies.service';
  import { CreateMovieDto } from './dto/create-movie.dto';
  import { UpdateMovieDto } from './dto/update-movie.dto';
  
  @Controller('movies')
  export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}
  
    @Post()
    create(@Body() dto: CreateMovieDto) {
      return this.moviesService.create(dto);
    }
  
    @Get()
    findAll() {
      return this.moviesService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.moviesService.findOne(id);
    }
  
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: UpdateMovieDto,
    ) {
      return this.moviesService.update(id, dto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.moviesService.remove(id);
    }
  }
  