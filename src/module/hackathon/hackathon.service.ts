import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../lib/database/prisma.service.js';
import { CreateHackathonDto } from './dto/create-hackathon.dto.js';
import { UpdateHackathonDto } from './dto/update-hackathon.dto.js';

@Injectable()
export class HackathonService {
  constructor(private readonly prisma: PrismaService) {}

  create(authorId: string, createHackathonDto: CreateHackathonDto) {
    const { startsAt, endsAt, ...data } = createHackathonDto;

    return this.prisma.hackathon.create({
      data: {
        ...data,
        startDate: startsAt,
        endDate: endsAt,
        authorId,
      },
    });
  }

  findAll() {
    return this.prisma.hackathon.findMany({
      orderBy: { startDate: 'desc' },
    });
  }

  async findOne(id: string) {
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id },
    });

    if (!hackathon) {
      throw new NotFoundException(`Hackathon with ID ${id} not found`);
    }

    return hackathon;
  }

  async update(id: string, updateHackathonDto: UpdateHackathonDto) {
    await this.findOne(id);
    const { startsAt, endsAt, ...data } = updateHackathonDto;

    return this.prisma.hackathon.update({
      where: { id },
      data: {
        ...data,
        ...(startsAt !== undefined ? { startDate: startsAt } : {}),
        ...(endsAt !== undefined ? { endDate: endsAt } : {}),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.hackathon.delete({
      where: { id },
    });
  }

  async join(hackathonId: string, userId: string) {
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id: hackathonId },
      select: { id: true, isActive: true, endDate: true },
    });

    if (!hackathon) {
      throw new NotFoundException(`Hackathon with ID ${hackathonId} not found`);
    }

    if (!hackathon.isActive) {
      throw new BadRequestException('Hackathon is not active');
    }

    if (hackathon.endDate <= new Date()) {
      throw new BadRequestException('Hackathon has already ended');
    }

    try {
      return await this.prisma.hackathonParticipant.create({
        data: { hackathonId, userId },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException('User has already joined this hackathon');
      }

      throw error;
    }
  }
}
