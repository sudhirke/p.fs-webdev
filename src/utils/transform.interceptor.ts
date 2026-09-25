import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const statusCode = response.statusCode ?? 200;

    return next.handle().pipe(
      // Transform the response here if needed
      map((data: T) => ({
        statusCode,
        message: 'Request successful',
        data,
      })),
    );
  }
}
