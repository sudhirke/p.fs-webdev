import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../lib/database/prisma.service.js';
import type { CreateHackathonDto } from './dto/create-hackathon.dto.js';
import { HackathonService } from './hackathon.service.js';

describe('HackathonService', () => {
  const create = vi.fn();
  const findMany = vi.fn();
  const findUnique = vi.fn();
  const update = vi.fn();
  const remove = vi.fn();
  const join = vi.fn();
  const prisma = {
    hackathon: { create, findMany, findUnique, update, delete: remove },
    hackathonParticipant: { create: join },
  } as unknown as PrismaService;
  let service: HackathonService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new HackathonService(prisma);
  });

  it('creates a hackathon with the authenticated user as author', async () => {
    const dto: CreateHackathonDto = {
      name: 'NestJS Hackathon',
      description: 'Build something excellent with NestJS.',
      startsAt: new Date('2099-01-01T09:00:00.000Z'),
      endsAt: new Date('2099-01-02T09:00:00.000Z'),
      isActive: true,
    };
    const hackathon = { id: 'hackathon-1' };
    create.mockResolvedValue(hackathon);

    await expect(service.create('admin-1', dto)).resolves.toBe(hackathon);
    expect(create).toHaveBeenCalledWith({
      data: {
        name: dto.name,
        description: dto.description,
        isActive: true,
        startDate: dto.startsAt,
        endDate: dto.endsAt,
        authorId: 'admin-1',
      },
    });
  });

  it('returns all hackathons ordered by start date', async () => {
    const hackathons = [{ id: 'hackathon-1' }];
    findMany.mockResolvedValue(hackathons);

    await expect(service.findAll()).resolves.toBe(hackathons);
    expect(findMany).toHaveBeenCalledWith({
      orderBy: { startDate: 'desc' },
    });
  });

  it('returns a hackathon by ID', async () => {
    const hackathon = { id: 'hackathon-1' };
    findUnique.mockResolvedValue(hackathon);

    await expect(service.findOne('hackathon-1')).resolves.toBe(hackathon);
  });

  it('throws when a hackathon is not found', async () => {
    findUnique.mockResolvedValue(null);

    await expect(service.findOne('missing')).rejects.toThrow(NotFoundException);
  });

  it('updates an existing hackathon without changing its author', async () => {
    findUnique.mockResolvedValue({ id: 'hackathon-1' });
    update.mockResolvedValue({ id: 'hackathon-1', name: 'Updated event' });
    const startsAt = new Date('2099-02-01T09:00:00.000Z');

    await service.update('hackathon-1', {
      name: 'Updated event',
      startsAt,
    });

    expect(update).toHaveBeenCalledWith({
      where: { id: 'hackathon-1' },
      data: { name: 'Updated event', startDate: startsAt },
    });
  });

  it('deletes an existing hackathon', async () => {
    const hackathon = { id: 'hackathon-1' };
    findUnique.mockResolvedValue(hackathon);
    remove.mockResolvedValue(hackathon);

    await expect(service.remove('hackathon-1')).resolves.toBe(hackathon);
    expect(remove).toHaveBeenCalledWith({
      where: { id: 'hackathon-1' },
    });
  });

  it('creates a participant record for an eligible hackathon', async () => {
    const participant = {
      id: 'participant-1',
      hackathonId: 'hackathon-1',
      userId: 'user-1',
    };
    findUnique.mockResolvedValue({
      id: 'hackathon-1',
      isActive: true,
      endDate: new Date('2099-01-01T00:00:00.000Z'),
    });
    join.mockResolvedValue(participant);

    await expect(service.join('hackathon-1', 'user-1')).resolves.toBe(
      participant,
    );
    expect(join).toHaveBeenCalledWith({
      data: { hackathonId: 'hackathon-1', userId: 'user-1' },
    });
  });

  it('rejects joining a missing hackathon', async () => {
    findUnique.mockResolvedValue(null);

    await expect(service.join('missing', 'user-1')).rejects.toThrow(
      NotFoundException,
    );
    expect(join).not.toHaveBeenCalled();
  });

  it('rejects joining an inactive hackathon', async () => {
    findUnique.mockResolvedValue({
      id: 'hackathon-1',
      isActive: false,
      endDate: new Date('2099-01-01T00:00:00.000Z'),
    });

    await expect(service.join('hackathon-1', 'user-1')).rejects.toThrow(
      'Hackathon is not active',
    );
    expect(join).not.toHaveBeenCalled();
  });

  it('rejects joining an ended hackathon', async () => {
    findUnique.mockResolvedValue({
      id: 'hackathon-1',
      isActive: true,
      endDate: new Date('2020-01-01T00:00:00.000Z'),
    });

    await expect(service.join('hackathon-1', 'user-1')).rejects.toThrow(
      'Hackathon has already ended',
    );
    expect(join).not.toHaveBeenCalled();
  });

  it('translates duplicate participant records into a bad request', async () => {
    findUnique.mockResolvedValue({
      id: 'hackathon-1',
      isActive: true,
      endDate: new Date('2099-01-01T00:00:00.000Z'),
    });
    join.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
        code: 'P2002',
        clientVersion: '7.10.0',
      }),
    );

    await expect(service.join('hackathon-1', 'user-1')).rejects.toThrow(
      'User has already joined this hackathon',
    );
  });
});
