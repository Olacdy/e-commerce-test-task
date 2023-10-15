import { FC, ReactNode } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import useUserStore from '@/context/user-context';

type AdminRouteProps = {
  children?: ReactNode;
};

const AdminRoute: FC<AdminRouteProps> = ({ children }) => {
  const user = useUserStore((state) => state.user);

  if (user?.role !== 'admin') {
    return <Navigate to='/' replace />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;
