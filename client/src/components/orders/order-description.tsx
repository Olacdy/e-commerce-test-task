import { FC } from 'react';

import { OrderDescriptionType } from '@/types/order-description-type';

type OrderDescriptionProps = {
  orderDescriptions: OrderDescriptionType[];
};

const OrderDescription: FC<OrderDescriptionProps> = ({ orderDescriptions }) => {
  return (
    <ul className='flex w-full flex-col gap-5 pr-2'>
      {orderDescriptions.map((od, index) => {
        return (
          <li
            key={od.item.id}
            className='flex items-center justify-between gap-1.5 text-xl'>
            <p>{`${index + 1}. ${od.item.name}`}</p>
            <span className='mb-1.5 flex-1 self-end border-b-2 border-dotted' />
            <p>{`${od.quantity} x ${od.item.price}`}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default OrderDescription;
