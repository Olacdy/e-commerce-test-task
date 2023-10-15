import { CartItemType } from '@/types/cart-type';
import { FC } from 'react';

type CartTableProps = {
  cart: CartItemType[];
};

const CartTable: FC<CartTableProps> = ({ cart }) => {
  return (
    <ul className='flex w-full flex-col gap-5 pr-2'>
      {cart.map((ct, index) => {
        return (
          <li
            key={ct.item.id}
            className='flex items-center justify-between gap-1.5 text-xl'>
            <p>{`${index + 1}. ${ct.item.name}`}</p>
            <span className='mb-1.5 flex-1 self-end border-b-2 border-dotted' />
            <p>{`${ct.amount} x ${ct.item.price}`}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default CartTable;
