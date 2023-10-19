import { Dispatch, FC, SetStateAction } from 'react';

import { toast } from 'sonner';

import snakecaseKeys from 'snakecase-keys';

import { Button } from '@/components/ui/button';

import OrderDescription from '@/components/orders/order-description';

import useCartStore from '@/context/cart-context';
import useTokenStore from '@/context/token-context';

import { getApiUrl } from '@/lib/utils';

import { OrderType } from '@/schemas/order-schemas';
import { Link } from 'react-router-dom';

type CartProps = {
  setOrders: Dispatch<SetStateAction<OrderType[]>>;
  setOrdersTab: () => void;
};

const Cart: FC<CartProps> = ({ setOrders, setOrdersTab }) => {
  const token = useTokenStore((state) => state.token);
  const { total, cart, deleteFromCart, clearCart } = useCartStore((state) => ({
    total: state.total(),
    cart: state.cart,
    deleteFromCart: state.deleteFromCart,
    clearCart: state.clearCart,
  }));

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

      setOrders((prev) => [
        { ...data, createdAt: new Date(data.createdAt) },
        ...prev,
      ]);

      setOrdersTab();

      toast.success('Order created.');
    } catch (error) {
      toast.error('Something went wrong. Try again later.');
    }
  };

  return (
    <>
      {cart.length > 0 ? (
        <>
          <OrderDescription
            orderDescriptions={cart}
            handleDeleteFromCart={deleteFromCart}
          />

          <div className='flex flex-col-reverse items-end justify-between gap-5 sm:flex-row sm:items-center'>
            <Button
              variant='outline'
              onClick={clearCart}
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
        </>
      ) : (
        <div className='flex w-full flex-col items-center gap-12 pt-20'>
          <h2 className='text-3xl md:text-5xl'>Cart is empty.</h2>
          <Link to='/'>
            <Button variant='link' className='text-lg md:text-2xl'>
              Try to add something
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
