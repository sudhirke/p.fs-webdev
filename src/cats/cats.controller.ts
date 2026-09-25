import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
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
    try {
      return this.catsService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          error: 'Unable to retrieve cat details!!',
          status: HttpStatus.FORBIDDEN,
        },
        HttpStatus.FORBIDDEN,
        { cause: error },
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat | undefined> {
    return this.catsService.findOne(id);
  }

  @Get('search/:name')
  async searchByName(@Param('name') name: string): Promise<Cat[]> {
    return this.catsService.findByName(name);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: CreateCatDto) {
    this.catsService.update(id, updateCatDto);
  }
}
