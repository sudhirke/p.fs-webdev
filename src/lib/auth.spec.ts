import { describe, expect, it } from 'vitest';
import { baseAuthOptions } from './auth.js';

describe('Better Auth configuration', () => {
  it('enables email and password authentication', () => {
    expect(baseAuthOptions.emailAndPassword.enabled).toBe(true);
  });

  it('keeps role server-owned and defaults new users to participant', () => {
    const role = baseAuthOptions.user.additionalFields.role;

    expect(role.type).toEqual(['PARTICIPANT', 'ADMIN']);
    expect(role.defaultValue).toBe('PARTICIPANT');
    expect(role.input).toBe(false);
    expect(role.required).toBe(true);
  });
});
