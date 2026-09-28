import { Test, type TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';

describe('UserController', () => {
  const userService = {
    findAll: vi.fn(),
    findById: vi.fn(),
  };
  let controller: UserController;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: userService }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get(UserController);
  });

  it('delegates listing users to the service', async () => {
    const users = [{ id: 'user-1' }];
    userService.findAll.mockResolvedValue(users);

    await expect(controller.findAll()).resolves.toBe(users);
  });

  it('restricts listing users to admins', () => {
    const handler = Object.getOwnPropertyDescriptor(
      UserController.prototype,
      'findAll',
    )?.value as unknown;

    expect(Reflect.getMetadata('ROLES', handler)).toEqual(['ADMIN']);
  });

  it('delegates lookup by ID to the service', async () => {
    const user = { id: 'user-1' };
    userService.findById.mockResolvedValue(user);

    await expect(controller.findById('user-1')).resolves.toBe(user);
    expect(userService.findById).toHaveBeenCalledWith('user-1');
  });
});
