import { FC } from 'react';

import { Link, redirect } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { Icons } from '@/components/icons';
import UserDropdown from '@/components/user/user-dropdown';

import useTokenStore from '@/context/token-context';
import useUserStore from '@/context/user-context';

type HeaderProps = {};

const Header: FC<HeaderProps> = ({}) => {
  const tokenStore = useTokenStore();
  const userStore = useUserStore();

  const handleLogout = () => {
    tokenStore.clearToken();
    userStore.clearUser();

    redirect('/auth/signin');
  };

  return (
    <header className='flex w-full max-w-lg p-5 md:max-w-3xl lg:max-w-6xl'>
      <nav className='flex flex-1 items-center justify-between'>
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
          <li>
            <Link to='/orders'>
              <Button size='icon' variant='ghost'>
                <Icons.cart className='md:h-8 md:w-8' />
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
