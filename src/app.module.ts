import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/auth.js'; // Your Better Auth instance
import { UserController } from './user/user.controller.js';

@Module({
  imports: [AuthModule.forRoot({ auth })],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
