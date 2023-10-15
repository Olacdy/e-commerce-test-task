import { useEffect, useState } from 'react';

import ItemsTable from '@/components/items/items-table';

import useTokenStore from '@/context/token-context';

import { getApiUrl } from '@/lib/utils';

import { ItemType } from '@/types/item-type';

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

      const response = await fetch(`${getApiUrl()}/items`, requestOptions);

      const data = await response.json();

      setItems(data);
    };

    fetchItems();
  }, [token]);

  return <ItemsTable items={items} />;
};

export default Home;
