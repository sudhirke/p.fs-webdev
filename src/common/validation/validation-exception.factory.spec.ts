import { BadRequestException } from '@nestjs/common';
import type { ValidationError } from 'class-validator';
import { describe, expect, it } from 'vitest';
import { validationExceptionFactory } from './validation-exception.factory.js';

describe('validationExceptionFactory', () => {
  it('returns clean property and message entries', () => {
    const errors = [
      {
        property: 'email',
        constraints: {
          isEmail: 'email must be an email',
          isNotEmpty: 'email should not be empty',
        },
      },
    ] as ValidationError[];

    const exception = validationExceptionFactory(errors);

    expect(exception).toBeInstanceOf(BadRequestException);
    expect(exception.getResponse()).toEqual({
      statusCode: 400,
      message: 'Validation failed',
      errors: [
        { property: 'email', message: 'email must be an email' },
        { property: 'email', message: 'email should not be empty' },
      ],
    });
  });

  it('flattens nested validation property paths', () => {
    const errors = [
      {
        property: 'profile',
        children: [
          {
            property: 'name',
            constraints: { isString: 'name must be a string' },
          },
        ],
      },
    ] as ValidationError[];

    const exception = validationExceptionFactory(errors);

    expect(exception.getResponse()).toMatchObject({
      errors: [{ property: 'profile.name', message: 'name must be a string' }],
    });
  });
});
