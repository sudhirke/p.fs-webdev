import { Reflector } from '@nestjs/core';

export const ResponseMesssage = Reflector.createDecorator<string>();
