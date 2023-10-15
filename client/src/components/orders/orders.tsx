import { FC, useState } from 'react';

import { toast } from 'sonner';

import snakecaseKeys from 'snakecase-keys';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import CartTable from '@/components/orders/cart-table';

import useCartStore from '@/context/cart-context';
import useTokenStore from '@/context/token-context';

import { getApiUrl } from '@/lib/utils';

type OrdersProps = {};

const Orders: FC<OrdersProps> = ({}) => {
  const token = useTokenStore((state) => state.token);
  const { cart, total, clearCart } = useCartStore((state) => ({
    cart: state.cart,
    total: state.total(),
    clearCart: state.clearCart,
  }));

  const [tabValue, setTabValue] = useState<'cart' | 'orders'>(
    cart.length > 0 ? 'cart' : 'orders'
  );

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
              quantity: ct.amount,
            })),
          },
        })
      ),
    };

    try {
      const response = await fetch(`${getApiUrl()}/orders`, requestOptions);

      if (!response.ok) throw new Error(`${response.status}`);

      clearCart();

      setTabValue('orders');

      toast.success('Order created.');
    } catch (error) {
      toast.error('Something went wrong. Try again later.');
    }
  };

  return (
    <section className='flex w-full max-w-lg flex-col px-10 pb-10 md:max-w-3xl lg:max-w-6xl'>
      <Tabs value={tabValue} onValueChange={setTabValue} className='w-full'>
        <TabsList className='grid w-full max-w-xs grid-cols-2'>
          <TabsTrigger disabled={cart.length < 1} value='cart'>
            Cart
          </TabsTrigger>
          <TabsTrigger value='orders'>Order</TabsTrigger>
        </TabsList>
        <TabsContent value='orders'></TabsContent>
        <TabsContent value='cart' className='flex flex-col gap-32 pt-12'>
          <CartTable cart={cart} />

          <div className='flex items-center gap-5 self-end'>
            <p className='text-xl'>
              Total: <span>{total}</span>
            </p>
            <Button onClick={handleOrderConfirm} className='px-7 text-base'>
              Confirm
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Orders;
