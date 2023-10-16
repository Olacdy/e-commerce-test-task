import { FC, ReactNode } from 'react';

import { Outlet } from 'react-router-dom';

type AuthLayoutProps = {
  children?: ReactNode;
};

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className='flex h-screen max-h-screen w-full items-center justify-center'>
      {children ? children : <Outlet />}
    </main>
  );
};

export default AuthLayout;
