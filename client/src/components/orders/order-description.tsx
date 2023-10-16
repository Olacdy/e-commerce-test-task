import { FC } from 'react';

import { Button } from '@/components/ui/button';

import { Icons } from '@/components/icons';

import { OrderDescriptionType } from '@/types/order-description-type';

type OrderDescriptionProps = {
  orderDescriptions: OrderDescriptionType[];
  handleDeleteFromCart?: (cartItem: OrderDescriptionType) => void;
};

const OrderDescription: FC<OrderDescriptionProps> = ({
  orderDescriptions,
  handleDeleteFromCart,
}) => {
  return (
    <ul className='flex w-full flex-col gap-5'>
      {orderDescriptions.map((od, index) => {
        return (
          <li
            key={od.item.id}
            className='flex items-center justify-between gap-1.5 text-xl'>
            <p>{`${index + 1}. ${od.item.name}`}</p>
            <span className='mb-1.5 flex-1 self-end border-b-2 border-dotted' />
            <div className='flex items-center gap-4'>
              <p>{`${od.quantity} x ${od.item.price}`}</p>
              {handleDeleteFromCart && (
                <Button
                  variant='destructive'
                  onClick={() => handleDeleteFromCart(od)}
                  className='h-8 px-1.5 py-0 dark:text-foreground'>
                  <Icons.cross />
                </Button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default OrderDescription;
