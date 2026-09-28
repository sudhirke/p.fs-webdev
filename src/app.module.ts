import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { createAuth } from './lib/auth.js';
import { DatabaseModule } from './lib/database/database.module.js';
import { PrismaService } from './lib/database/prisma.service.js';
import { UserModule } from './module/user/user.module.js';

const requiredEnvironmentVariables = [
  'DATABASE_URL',
  'BETTER_AUTH_SECRET',
  'BETTER_AUTH_URL',
] as const;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config: Record<string, unknown>) => {
        for (const key of requiredEnvironmentVariables) {
          if (typeof config[key] !== 'string' || config[key].length === 0) {
            throw new Error(`${key} is required`);
          }
        }

        return config;
      },
    }),
    DatabaseModule,
    AuthModule.forRootAsync({
      imports: [DatabaseModule],
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => ({
        auth: createAuth(prisma),
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
