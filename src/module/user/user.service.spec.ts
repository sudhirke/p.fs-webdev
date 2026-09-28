import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PrismaService } from '../../lib/database/prisma.service.js';
import { UserService } from './user.service.js';

describe('UserService', () => {
  const findMany = vi.fn();
  const findUnique = vi.fn();
  const prisma = {
    user: { findMany, findUnique },
  } as unknown as PrismaService;
  let service: UserService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new UserService(prisma);
  });

  it('returns all users newest first', async () => {
    const users = [{ id: 'user-1' }];
    findMany.mockResolvedValue(users);

    await expect(service.findAll()).resolves.toBe(users);
    expect(findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: 'desc' },
    });
  });

  it('returns a user by ID', async () => {
    const user = { id: 'user-1' };
    findUnique.mockResolvedValue(user);

    await expect(service.findById('user-1')).resolves.toBe(user);
    expect(findUnique).toHaveBeenCalledWith({
      where: { id: 'user-1' },
    });
  });

  it('throws NotFoundException when the user does not exist', async () => {
    findUnique.mockResolvedValue(null);

    await expect(service.findById('missing')).rejects.toThrow(
      NotFoundException,
    );
  });
});
