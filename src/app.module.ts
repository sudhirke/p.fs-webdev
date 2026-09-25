import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CatsService } from './cats/cats.service';
import { CatsController } from './cats/cats.controller';
import { CatsLogger } from './cats/cats.logger';

@Module({
  imports: [UserModule, PostModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService, CatsLogger],
})
export class AppModule {}
