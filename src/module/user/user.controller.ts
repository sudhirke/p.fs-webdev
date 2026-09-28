import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard, Roles } from '@thallesp/nestjs-better-auth';
import { UserService } from './user.service.js';
import { ResponseMesssage } from '../../common/decorators/response-messsage.decorator.js';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @Roles(['ADMIN'])
  @ResponseMesssage('USER: Fetching all users')
  findAll() {
    return this.userService.findAll();
  }

  @ResponseMesssage('USER: Fetching user by id')
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
