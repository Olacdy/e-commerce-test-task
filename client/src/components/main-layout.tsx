import { FC, ReactNode } from 'react';

import { Outlet } from 'react-router-dom';

import Header from '@/components/header';

type MainLayoutProps = {
  children?: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className='flex h-screen max-h-screen w-full flex-col items-center gap-20'>
      <Header />
      {children ? children : <Outlet />}
    </main>
  );
};

export default MainLayout;
