import type { CallHandler, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { lastValueFrom, of } from 'rxjs';
import { describe, expect, it } from 'vitest';
import { ResponseMesssage } from '../decorators/response-messsage.decorator.js';
import { ResponseInterceptor } from './response.interceptor.js';

class TestController {
  defaultMessage(this: void) {}

  @ResponseMesssage('Users retrieved')
  customMessage(this: void) {}
}

const createContext = (
  handler: TestController['defaultMessage'],
  statusCode = 200,
) =>
  ({
    getHandler: () => handler,
    getClass: () => TestController,
    switchToHttp: () => ({
      getResponse: () => ({ statusCode }),
    }),
  }) as unknown as ExecutionContext;

describe('ResponseInterceptor', () => {
  const interceptor = new ResponseInterceptor(new Reflector());
  const controller = new TestController();

  it('wraps responses with the default message', async () => {
    const next = { handle: () => of({ id: 'user-1' }) } as CallHandler;

    await expect(
      lastValueFrom(
        interceptor.intercept(createContext(controller.defaultMessage), next),
      ),
    ).resolves.toEqual({
      statusCode: 200,
      message: 'Success',
      data: { id: 'user-1' },
    });
  });

  it('uses the custom response message and HTTP status', async () => {
    const next = { handle: () => of(['user-1']) } as CallHandler;

    await expect(
      lastValueFrom(
        interceptor.intercept(
          createContext(controller.customMessage, 201),
          next,
        ),
      ),
    ).resolves.toEqual({
      statusCode: 201,
      message: 'Users retrieved',
      data: ['user-1'],
    });
  });
});
