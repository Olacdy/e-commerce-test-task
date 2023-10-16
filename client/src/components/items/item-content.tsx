import { FC, useState } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { Icons } from '@/components/icons';

import { ItemType } from '@/types/item-type';
import { OrderDescriptionType } from '@/types/order-description-type';

type ItemContentProps = {
  item: ItemType;
  addToCart: (cartItem: OrderDescriptionType) => void;
};

const ItemContent: FC<ItemContentProps> = ({ item, addToCart }) => {
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
    <div className='flex flex-col gap-5 p-5'>
      <p className='md:text-lg'>Description: {item.description}</p>
      <div className='flex gap-5 self-end'>
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
  );
};

export default ItemContent;
