import { z } from 'zod';

export const itemSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(4),
  description: z.string().optional(),
  price: z.coerce.number().positive(),
});

export const itemsSchema = itemSchema.array();

export const formItemSchema = z.object({
  name: z.string().min(4, {
    message: 'Too short. Minimal length is 4.',
  }),
  description: z.string().optional(),
  price: z.coerce.number().positive(),
});

export type ItemType = z.infer<typeof itemSchema>;
