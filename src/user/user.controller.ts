import { Controller, Get } from '@nestjs/common';
import * as nestjsBetterAuth from '@thallesp/nestjs-better-auth';

@Controller('users')
export class UserController {
  @Get('me')
  async getProfile(
    @nestjsBetterAuth.Session() session: nestjsBetterAuth.UserSession,
  ) {
    return { user: session.user };
  }

  @Get('public')
  @nestjsBetterAuth.AllowAnonymous() // Allow anonymous access
  async getPublic() {
    return { message: 'Public route' };
  }

  @Get('optional')
  @nestjsBetterAuth.OptionalAuth() // Authentication is optional
  async getOptional(
    @nestjsBetterAuth.Session() session: nestjsBetterAuth.UserSession,
  ) {
    return { authenticated: !!session };
  }
}
