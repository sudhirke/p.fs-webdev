import { Injectable, LoggerService } from '@nestjs/common';
@Injectable()
export class CatsLogger implements LoggerService {
  log(message: string) {
    console.log(`CatsLogger - ${message}`);
  }

  error(message: string, trace: string) {
    console.error(`CatsLogger - ${message}`, trace);
  }

  warn(message: string) {
    console.warn(`CatsLogger - ${message}`);
  }

  debug(message: string) {
    console.debug(`CatsLogger - ${message}`);
  }

  verbose(message: string) {
    console.log(`CatsLogger - ${message}`);
  }
}
