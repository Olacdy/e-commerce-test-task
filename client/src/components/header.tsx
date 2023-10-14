import { FC } from 'react';

import { Link, redirect } from 'react-router-dom';

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
      <nav className='flex flex-1 justify-between'>
        <Link to='/'>
          <span className='text-3xl font-bold uppercase'>E-Commerce</span>
        </Link>
        <ul>
          <li>
            <Link to='/users'>
              <Icons.users />
            </Link>
          </li>
          <li>
            <Link to='/orders'>
              <Icons.cart />
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
