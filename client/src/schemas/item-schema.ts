import { z } from 'zod';

export const itemSchema = z.object({
  name: z.string().min(4, {
    message: 'Too short. Minimal length is 4.',
  }),
  description: z.string().optional(),
  price: z.coerce.number().positive(),
});
