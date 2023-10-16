import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import snakecaseKeys from 'snakecase-keys';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import OrderDescription from '@/components/orders/order-description';
import OrdersTable from '@/components/orders/orders-table';

import useCartStore from '@/context/cart-context';
import useTokenStore from '@/context/token-context';

import { getApiUrl } from '@/lib/utils';

import {
  OrderDescriptionType,
  OrderType,
  ordersSchema,
} from '@/schemas/order-schemas';

const Orders = () => {
  const token = useTokenStore((state) => state.token);
  const { cart, total, deleteFromCart, clearCart } = useCartStore((state) => ({
    cart: state.cart,
    total: state.total(),
    deleteFromCart: state.deleteFromCart,
    clearCart: state.clearCart,
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

  const handleOrderConfirm = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(
        snakecaseKeys({
          order: {
            orderDescriptionsAttributes: cart.map((ct) => ({
              itemId: ct.item.id,
              quantity: ct.quantity,
            })),
          },
        })
      ),
    };

    try {
      const response = await fetch(`${getApiUrl()}/orders`, requestOptions);

      if (!response.ok) throw new Error(`${response.status}`);

      const data = await response.json();

      clearCart();

      setTabValue('orders');

      setOrders((prev) => [
        { ...data, createdAt: new Date(data.createdAt) },
        ...prev,
      ]);

      toast.success('Order created.');
    } catch (error) {
      toast.error('Something went wrong. Try again later.');
    }
  };

  const handleClearCart = () => {
    clearCart();
    setTabValue('orders');
  };

  const handleDeleteFromCart = (cartItem: OrderDescriptionType) => {
    deleteFromCart(cartItem);

    if (cart.length === 1) setTabValue('orders');
  };

  return (
    <section className='flex w-full max-w-lg flex-col px-10 pb-10 md:max-w-3xl lg:max-w-6xl'>
      <Tabs
        value={tabValue}
        onValueChange={handleTabValueChange}
        className='w-full'>
        <TabsList className='grid w-full max-w-xs grid-cols-2'>
          <TabsTrigger disabled={cart.length < 1} value='cart'>
            Cart
          </TabsTrigger>
          <TabsTrigger value='orders'>Orders</TabsTrigger>
        </TabsList>
        <TabsContent value='orders'>
          <OrdersTable orders={orders} />
        </TabsContent>
        <TabsContent value='cart' className='flex flex-col gap-32 pt-12'>
          <OrderDescription
            orderDescriptions={cart}
            handleDeleteFromCart={handleDeleteFromCart}
          />

          <div className='flex flex-col-reverse items-end justify-between gap-5 sm:flex-row sm:items-center'>
            <Button
              variant='outline'
              onClick={handleClearCart}
              className='whitespace-nowrap text-base'>
              Clear Cart
            </Button>
            <div className='flex items-center gap-5'>
              <p className='text-xl'>
                Total: <span>{total}</span>
              </p>
              <Button onClick={handleOrderConfirm} className='px-7 text-base'>
                Confirm
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Orders;
