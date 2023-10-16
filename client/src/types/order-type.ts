import { OrderDescriptionType } from '@/types/order-description-type';

export type OrderType = {
  createdAt: Date;
  amount: number;
  orderDescriptions: OrderDescriptionType[];
  userEmail: string;
};
