import { betterAuth } from 'better-auth';
import { baseAuthOptions } from './auth.js';

// Used only by the Better Auth CLI to derive the ORM schema. Runtime auth is
// created through Nest dependency injection in AppModule.
export const auth = betterAuth(baseAuthOptions);
