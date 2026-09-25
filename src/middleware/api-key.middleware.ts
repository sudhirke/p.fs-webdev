import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    //Logic
    const apiKey = req.headers['x-api-key'];

    if (apiKey !== 'secret-key-123') {
      throw new UnauthorizedException('Invalid API Key');
    }

    //validation passed,  call the next middleware in chain
    next();
  }
}
