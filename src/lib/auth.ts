import { dash } from '@better-auth/infra';
import { prismaAdapter } from '@better-auth/prisma-adapter';
import { betterAuth, type BetterAuthOptions } from 'better-auth';
import { PrismaService } from './database/prisma.service.js';

export const baseAuthOptions = {
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ['PARTICIPANT', 'ADMIN'],
        required: true,
        defaultValue: 'PARTICIPANT',
        input: false,
      },
    },
  },
  plugins: [dash()],
} satisfies BetterAuthOptions;

export const createAuth = (prisma: PrismaService) =>
  betterAuth({
    ...baseAuthOptions,
    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),
  });

export type Auth = ReturnType<typeof createAuth>;
export type AuthSession = Auth['$Infer']['Session'];
