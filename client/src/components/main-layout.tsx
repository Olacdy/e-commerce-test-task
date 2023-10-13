import { FC, ReactNode } from 'react';

import { Outlet } from 'react-router-dom';

type MainLayoutProps = {
  children?: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <div>Main layout</div>
      {children ? children : <Outlet />}
    </>
  );
};

export default MainLayout;
