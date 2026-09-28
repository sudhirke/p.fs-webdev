import 'reflect-metadata';
import { Test, type TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ResponseMesssage } from '../../common/decorators/response-messsage.decorator.js';
import type { AuthSession } from '../../lib/auth.js';
import type { CreateHackathonDto } from './dto/create-hackathon.dto.js';
import { HackathonController } from './hackathon.controller.js';
import { HackathonService } from './hackathon.service.js';

const getHandler = (method: keyof HackathonController) =>
  Object.getOwnPropertyDescriptor(HackathonController.prototype, method)
    ?.value as unknown;

describe('HackathonController', () => {
  const hackathonService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
    join: vi.fn(),
  };
  let controller: HackathonController;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HackathonController],
      providers: [{ provide: HackathonService, useValue: hackathonService }],
    }).compile();

    controller = module.get(HackathonController);
  });

  it('passes the authenticated user ID as the author', async () => {
    const dto = {
      name: 'NestJS Hackathon',
      startsAt: new Date('2099-01-01T09:00:00.000Z'),
      endsAt: new Date('2099-01-02T09:00:00.000Z'),
    } as CreateHackathonDto;
    const session = { user: { id: 'admin-1' } } as AuthSession;
    hackathonService.create.mockResolvedValue({ id: 'hackathon-1' });

    await controller.create(session, dto);

    expect(hackathonService.create).toHaveBeenCalledWith('admin-1', dto);
  });

  it.each([
    ['create', 'Hackathon created successfully'],
    ['update', 'Hackathon updated successfully'],
    ['remove', 'Hackathon deleted successfully'],
  ] as const)('protects and labels the %s operation', (method, message) => {
    const handler = getHandler(method);

    expect(Reflect.getMetadata('ROLES', handler)).toEqual(['ADMIN']);
    expect(Reflect.getMetadata(ResponseMesssage.KEY, handler)).toBe(message);
  });

  it('allows participants to join using their session user ID', async () => {
    const session = { user: { id: 'user-1' } } as AuthSession;
    hackathonService.join.mockResolvedValue({ id: 'participant-1' });

    await controller.join('hackathon-1', session);

    expect(hackathonService.join).toHaveBeenCalledWith('hackathon-1', 'user-1');
    const handler = getHandler('join');
    expect(Reflect.getMetadata('ROLES', handler)).toEqual(['PARTICIPANT']);
    expect(Reflect.getMetadata(ResponseMesssage.KEY, handler)).toBe(
      'Joined hackathon successfully',
    );
  });
});
