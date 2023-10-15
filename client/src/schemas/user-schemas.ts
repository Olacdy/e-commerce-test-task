import { z } from 'zod';

export const editUserSchema = z
  .object({
    firstName: z.string().min(2, {
      message: 'First name is too short (min 2).',
    }),
    lastName: z.string().min(2, {
      message: 'Last name is too short (min 2).',
    }),
  })
  .partial();
