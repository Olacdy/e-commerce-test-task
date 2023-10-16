import { z } from 'zod';

import { itemSchema } from '@/schemas/item-schemas';

export const orderDescriptionSchema = z.object({
  item: itemSchema,
  quantity: z.number().positive(),
});

export const orderSchema = z.object({
  id: z.number().positive(),
  createdAt: z.coerce.date(),
  amount: z.coerce.number().positive(),
  userEmail: z.string().email(),
  orderDescriptions: orderDescriptionSchema.array(),
});

export const ordersSchema = orderSchema.array();

export type OrderDescriptionType = z.infer<typeof orderDescriptionSchema>;

export type OrderType = z.infer<typeof orderSchema>;
