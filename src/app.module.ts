import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CatsService } from './cats/cats.service';
import { CatsController } from './cats/cats.controller';
import { CatsLogger } from './cats/cats.logger';
import { ApiKeyMiddleware } from './middleware/api-key.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UserController } from './user/user.controller';

@Module({
  imports: [UserModule, PostModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService, CatsLogger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware, LoggerMiddleware)
      .exclude({ path: 'cats', method: RequestMethod.GET })
      .forRoutes(CatsController);
  }
}
