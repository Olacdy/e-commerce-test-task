import { FC, useState } from 'react';

import { Button } from '@/components/ui/button';

import { Icons } from '@/components/icons';

import { CartItemType } from '@/types/cart-type';
import { ItemType } from '@/types/item-type';
import { toast } from 'sonner';

type ItemContentProps = {
  item: ItemType;
  addToCart: (cartItem: CartItemType) => void;
};

const ItemContent: FC<ItemContentProps> = ({ item, addToCart }) => {
  const [amount, setAmount] = useState<number>(0);

  const increaseCount = () => {
    setAmount((prev) => prev + 1);
  };

  const decreaseCount = () => {
    setAmount((prev) => {
      const newAmount = prev - 1;
      if (newAmount > 0) return newAmount;
      return 0;
    });
  };

  const handleAddToCart = () => {
    addToCart({ item: item, amount: amount });
    if (amount > 0) {
      toast.success(`${amount} of ${item.name} added to cart.`);
      setAmount(0);
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
          <span>{amount}</span>
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
