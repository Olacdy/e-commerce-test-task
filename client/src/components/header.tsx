import { Link, useNavigate } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { Icons } from '@/components/icons';

import UserDropdown from '@/components/users/user-dropdown';

import useCartStore from '@/context/cart-context';
import useTokenStore from '@/context/token-context';
import useUserStore from '@/context/user-context';

const Header = () => {
  const tokenStore = useTokenStore();
  const userStore = useUserStore();
  const { cart, clearCart } = useCartStore((state) => ({
    cart: state.cart,
    clearCart: state.clearCart,
  }));

  const redirect = useNavigate()

  const handleLogout = () => {
    tokenStore.clearToken();
    userStore.clearUser();
    clearCart();

    redirect("/auth/signin")
  };

  return (
    <header className='flex w-full max-w-lg p-5 md:max-w-3xl lg:max-w-6xl'>
      <nav className='flex items-center justify-between flex-1'>
        <Link to='/'>
          <span className='text-xl font-bold uppercase md:text-3xl'>
            E-Commerce
          </span>
        </Link>
        <ul className='flex items-center gap-3 sm:gap-5'>
          {userStore.user?.role === 'admin' && (
            <li>
              <Link to='/users'>
                <Button size='icon' variant='ghost'>
                  <Icons.users className='md:h-8 md:w-8' />
                </Button>
              </Link>
            </li>
          )}
          <li className='relative group'>
            <Link to='/orders'>
              <Button size='icon' variant='ghost'>
                <Icons.cart className='md:h-8 md:w-8' />
                {cart.length > 0 && (
                  <Badge className='absolute w-6 h-6 -right-1 -top-1 group-hover:bg-secondary/90 group-hover:text-foreground'>
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </Link>
          </li>
          <li>
            <UserDropdown user={userStore.user} handleLogout={handleLogout} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
