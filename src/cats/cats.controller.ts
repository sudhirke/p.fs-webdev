import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto.js';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  //define consructor to inject the CatsService
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  //Get route to return all cats using the CatsService
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat | undefined> {
    return this.catsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: CreateCatDto) {
    this.catsService.update(id, updateCatDto);
  }
}
