import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import ItemsTable from '@/components/items/items-table';

import useTokenStore from '@/context/token-context';

import { getApiUrl } from '@/lib/utils';

import { ItemType, itemsSchema } from '@/schemas/item-schemas';

const Home = () => {
  const token = useTokenStore((store) => store.token);

  const [items, setItems] = useState<ItemType[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const requestOptions = {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(`${getApiUrl()}/items`, requestOptions);

        if (!response.ok) throw new Error(`${response.status}`);

        const rawItems = await response.json();

        const parsedItems = await itemsSchema.parseAsync(rawItems);

        setItems(parsedItems);
      } catch (error) {
        toast.error('Something went wrong. Unable to fetch items.');
      }
    };

    fetchItems();
  }, [token]);

  return <ItemsTable items={items} />;
};

export default Home;
