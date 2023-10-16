import { FC, useState } from 'react';

import { Link } from 'react-router-dom';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { Icons } from '@/components/icons';

import useUserStore from '@/context/user-context';

import { cn } from '@/lib/utils';

import { ItemType } from '@/schemas/item-schemas';
import { OrderDescriptionType } from '@/schemas/order-schemas';

type ItemContentProps = {
  item: ItemType;
  addToCart: (cartItem: OrderDescriptionType) => void;
};

const ItemContent: FC<ItemContentProps> = ({ item, addToCart }) => {
  const role = useUserStore((state) => state.user?.role);

  const [quantity, setQuantity] = useState<number>(0);

  const increaseCount = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseCount = () => {
    setQuantity((prev) => {
      const newQuantity = prev - 1;
      if (newQuantity > 0) return newQuantity;
      return 0;
    });
  };

  const handleAddToCart = () => {
    addToCart({ item: item, quantity: quantity });
    if (quantity > 0) {
      toast.success(`${quantity} of ${item.name} added to cart.`);
      setQuantity(0);
    }
  };

  return (
    <div className='flex flex-col gap-10 p-5'>
      {item.description && (
        <p className='md:text-lg'>Description: {item.description}</p>
      )}
      <div
        className={cn('flex gap-5 ', {
          'self-end': role !== 'admin',
          'w-full justify-between': role === 'admin',
        })}>
        {role === 'admin' && (
          <Link to={`item/${item.id}`}>
            <Button>Edit Item</Button>
          </Link>
        )}
        <div className='flex gap-5'>
          <div className='flex items-center gap-3'>
            <Button
              className='bg-green-800 px-3 dark:bg-green-600'
              onClick={increaseCount}>
              <Icons.plus />
            </Button>
            <span>{quantity}</span>
            <Button
              className='px-3'
              variant='destructive'
              onClick={decreaseCount}>
              <Icons.minus />
            </Button>
          </div>
          <Button
            onClick={handleAddToCart}
            className='text-xs md:text-sm'
            variant='outline'>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemContent;
