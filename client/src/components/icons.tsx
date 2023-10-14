import { cn } from '@/lib/utils';
import {
  ShoppingCart,
  UserCircle2,
  Users,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  cart: ShoppingCart,
  user: UserCircle2,
  users: Users,
  menu: ({ ...props }: LucideProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='100'
      height='100'
      viewBox='0 0 50 50'
      fill='current'
      className={cn('', props.className)}>
      <path d='M5 8a2 2 0 1 0 0 4h40a2 2 0 1 0 0-4H5zm0 15a2 2 0 1 0 0 4h40a2 2 0 1 0 0-4H5zm0 15a2 2 0 1 0 0 4h40a2 2 0 1 0 0-4H5z' />
    </svg>
  ),
};
