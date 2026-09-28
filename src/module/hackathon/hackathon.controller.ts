import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Roles, Session } from '@thallesp/nestjs-better-auth';
import { ResponseMesssage } from '../../common/decorators/response-messsage.decorator.js';
import type { AuthSession } from '../../lib/auth.js';
import { HackathonService } from './hackathon.service.js';
import { CreateHackathonDto } from './dto/create-hackathon.dto.js';
import { UpdateHackathonDto } from './dto/update-hackathon.dto.js';

@Controller('hackathon')
export class HackathonController {
  constructor(private readonly hackathonService: HackathonService) {}

  @Post()
  @Roles(['ADMIN'])
  @ResponseMesssage('Hackathon created successfully')
  create(
    @Session() session: AuthSession,
    @Body() createHackathonDto: CreateHackathonDto,
  ) {
    return this.hackathonService.create(session.user.id, createHackathonDto);
  }

  @Post(':id/join')
  @Roles(['PARTICIPANT'])
  @ResponseMesssage('Joined hackathon successfully')
  join(@Param('id') id: string, @Session() session: AuthSession) {
    return this.hackathonService.join(id, session.user.id);
  }

  @Get()
  findAll() {
    return this.hackathonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hackathonService.findOne(id);
  }

  @Patch(':id')
  @Roles(['ADMIN'])
  @ResponseMesssage('Hackathon updated successfully')
  update(
    @Param('id') id: string,
    @Body() updateHackathonDto: UpdateHackathonDto,
  ) {
    return this.hackathonService.update(id, updateHackathonDto);
  }

  @Delete(':id')
  @Roles(['ADMIN'])
  @ResponseMesssage('Hackathon deleted successfully')
  remove(@Param('id') id: string) {
    return this.hackathonService.remove(id);
  }
}
