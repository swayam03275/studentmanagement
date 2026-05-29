import { z } from 'zod';

/**
 * Zod schema for admin login validation.
 * Enforces a valid email format and a minimum password length.
 */
export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .toLowerCase()
    .email('Email format is invalid'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),
});
