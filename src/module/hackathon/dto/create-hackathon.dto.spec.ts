import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { describe, expect, it } from 'vitest';
import { CreateHackathonDto } from './create-hackathon.dto.js';

describe('CreateHackathonDto', () => {
  it('transforms valid date strings into Date instances', async () => {
    const dto = plainToInstance(CreateHackathonDto, {
      name: 'NestJS Hackathon',
      description: 'A hackathon for building NestJS applications.',
      startsAt: '2099-01-01T09:00:00.000Z',
      endsAt: '2099-01-02T09:00:00.000Z',
      isActive: true,
    });

    await expect(validate(dto)).resolves.toHaveLength(0);
    expect(dto.startsAt).toBeInstanceOf(Date);
    expect(dto.endsAt).toBeInstanceOf(Date);
  });

  it('rejects short text, past dates, and a non-boolean active flag', async () => {
    const dto = plainToInstance(CreateHackathonDto, {
      name: 'No',
      description: 'Too short',
      startsAt: '2020-01-01T09:00:00.000Z',
      endsAt: '2020-01-02T09:00:00.000Z',
      isActive: 'true',
    });

    const errors = await validate(dto);

    expect(errors.map(({ property }) => property)).toEqual([
      'name',
      'description',
      'startsAt',
      'endsAt',
      'isActive',
    ]);
  });
});
