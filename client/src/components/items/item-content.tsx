import { ItemType } from '@/types/item-type';
import { FC, useState } from 'react';
import { Icons } from '../icons';
import { Button } from '../ui/button';

type ItemContentProps = {
  item: ItemType;
};

const ItemContent: FC<ItemContentProps> = ({ item }) => {
  const [count, setCount] = useState<number>(0);

  const increaseCount = () => {
    setCount((prev) => prev + 1);
  };

  const decreaseCount = () => {
    setCount((prev) => {
      const newValue = prev - 1;
      if (newValue > 0) return newValue;
      return 0;
    });
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
          <span>{count}</span>
          <Button
            className='px-3'
            variant='destructive'
            onClick={decreaseCount}>
            <Icons.minus />
          </Button>
        </div>
        <Button className='text-xs md:text-sm' variant='outline'>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ItemContent;
