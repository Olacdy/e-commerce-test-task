import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import OrdersTable from '@/components/orders/orders-table';

import useCartStore from '@/context/cart-context';
import useTokenStore from '@/context/token-context';

import { getApiUrl } from '@/lib/utils';

import Cart from '@/components/orders/cart';
import { OrderType, ordersSchema } from '@/schemas/order-schemas';

const Orders = () => {
  const token = useTokenStore((state) => state.token);
  const { cart } = useCartStore((state) => ({
    cart: state.cart,
  }));

  const [tabValue, setTabValue] = useState<'cart' | 'orders'>(
    cart.length > 0 ? 'cart' : 'orders'
  );

  const [orders, setOrders] = useState<OrderType[]>([]);

  const handleTabValueChange = (value: string) => {
    if (value === 'cart' || value === 'orders') setTabValue(value);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const requestOptions = {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(`${getApiUrl()}/orders`, requestOptions);

        if (!response.ok) throw new Error(`${response.status}`);

        const rawOrders = await response.json();

        const parsedOrders = await ordersSchema.parseAsync(rawOrders);

        setOrders(parsedOrders);
      } catch (error) {
        toast.error('Something went wrong. Unable to fetch orders.');
      }
    };

    if (orders.length < 1) fetchOrders();
  }, [token, orders.length]);

  return (
    <section className='flex w-full max-w-lg flex-col px-10 pb-10 md:max-w-3xl lg:max-w-6xl'>
      <Tabs
        value={tabValue}
        onValueChange={handleTabValueChange}
        className='w-full'>
        <TabsList className='grid w-full max-w-xs grid-cols-2'>
          <TabsTrigger value='cart'>Cart</TabsTrigger>
          <TabsTrigger value='orders'>Orders</TabsTrigger>
        </TabsList>
        <TabsContent value='orders'>
          <OrdersTable orders={orders} />
        </TabsContent>
        <TabsContent value='cart' className='flex flex-col gap-32 pt-12'>
          <Cart
            setOrders={setOrders}
            setOrdersTab={() => handleTabValueChange('orders')}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Orders;
