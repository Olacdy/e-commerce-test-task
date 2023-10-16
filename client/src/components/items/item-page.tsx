import { FC, useEffect, useState } from 'react';

import { toast } from 'sonner';

import { useParams } from 'react-router-dom';

import ItemForm from '@/components/items/item-form';

import useTokenStore from '@/context/token-context';

import { getApiUrl } from '@/lib/utils';

import { ItemType } from '@/types/item-type';

type ItemPageProps = {};

const ItemPage: FC<ItemPageProps> = ({}) => {
  const { itemId } = useParams();

  const token = useTokenStore((state) => state.token);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [item, setItem] = useState<ItemType>();

  useEffect(() => {
    const fetchItem = async () => {
      const requestOptions = {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(
          `${getApiUrl()}/items/${itemId}`,
          requestOptions
        );

        if (!response.ok) throw new Error(`${response.status}`);

        const data = await response.json();

        setItem(data);
      } catch (error) {
        toast.error('Failed to fetch item. Try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (!!itemId) fetchItem();
    else setIsLoading(false);
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return <ItemForm item={item} />;
};

export default ItemPage;
