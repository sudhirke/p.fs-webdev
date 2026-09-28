import { Controller, Get } from '@nestjs/common';
import * as nestjsBetterAuth from '@thallesp/nestjs-better-auth';
import type { AuthSession } from '../lib/auth.js';

@Controller('users')
export class UserController {
  @Get('me')
  async getProfile(@nestjsBetterAuth.Session() session: AuthSession) {
    return { user: session.user };
  }

  @Get('public')
  @nestjsBetterAuth.AllowAnonymous() // Allow anonymous access
  async getPublic() {
    return { message: 'Public route' };
  }

  @Get('optional')
  @nestjsBetterAuth.OptionalAuth() // Authentication is optional
  async getOptional(@nestjsBetterAuth.Session() session: AuthSession | null) {
    return { authenticated: !!session };
  }
}
