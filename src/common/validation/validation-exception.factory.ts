import { BadRequestException } from '@nestjs/common';
import type { ValidationError } from 'class-validator';

export interface ValidationErrorResponse {
  property: string;
  message: string;
}

const flattenValidationErrors = (
  errors: ValidationError[],
  parentPath = '',
): ValidationErrorResponse[] =>
  errors.flatMap((error) => {
    const property = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;
    const messages = Object.values(error.constraints ?? {}).map((message) => ({
      property,
      message,
    }));
    const childMessages = flattenValidationErrors(
      error.children ?? [],
      property,
    );

    return [...messages, ...childMessages];
  });

export const validationExceptionFactory = (errors: ValidationError[]) =>
  new BadRequestException({
    statusCode: 400,
    message: 'Validation failed',
    errors: flattenValidationErrors(errors),
  });
