import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CatsService } from './cats/cats.service';

@Module({
  imports: [UserModule, PostModule],
  controllers: [AppController],
  providers: [AppService, CatsService],
})
export class AppModule {}
