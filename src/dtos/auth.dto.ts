import { z } from 'zod';

export const registerDTO = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['user', 'admin']).optional(),
  }),
});

export const loginDTO = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});
