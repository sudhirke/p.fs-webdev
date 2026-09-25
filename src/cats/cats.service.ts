import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Cat } from './interfaces/cat.interface.ts';
import { CatsLogger } from './cats.logger.js';

@Injectable()
export class CatsService {
  //define private property cats of type Cat array to store the cats
  private readonly cats: Cat[] = [
    { id: '1', name: 'Fluffy', age: 3, breed: 'Persian' },
    { id: '2', name: 'Mittens', age: 2, breed: 'Siamese' },
    { id: '3', name: 'Whiskers', age: 5, breed: 'Maine Coon' },
    { id: '4', name: 'Snowball', age: 1, breed: 'British Shorthair' },
    { id: '5', name: 'Tiger', age: 4, breed: 'Bengal' },
  ];
  constructor(private readonly catsLogger: CatsLogger) {}

  //defind findAll method to return all cats
  findAll(): Cat[] {
    this.catsLogger.log('Returning all cats');
    return this.cats;
  }

  findOne(id: string): Cat | undefined {
    this.catsLogger.log(`Returning cat with id: ${id}`);
    const cat = this.cats.find((cat) => cat.id === id);
    if (!cat) {
      throw new NotFoundException('No cat found with this id!! Mew');
    }
    return cat;
  }

  findByName(name: string): Cat[] {
    this.catsLogger.log(`Returning cats with name: ${name}`);
    const cat = this.cats.filter((cat) =>
      cat.name.toLowerCase().includes(name.toLowerCase()),
    );

    if (cat.length <= 0) {
      throw new NotFoundException(`No cat found with that name: ${name}`);
    }
    return cat;
  }

  //Create a new cat and add it to the cats array
  create(cat: Cat) {
    this.cats.push(cat);
  }

  update(id: string, cat: Cat) {
    this.catsLogger.log(`Updating cat with id: ${id}`);
    const index = this.cats.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.cats[index] = cat;
    }
  }
}
