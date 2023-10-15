import { FC, ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import useUserStore from '@/context/user-context';

type UsersRouteProps = {
  children: ReactNode;
};

const UsersRoute: FC<UsersRouteProps> = ({ children }) => {
  const user = useUserStore((state) => state.user);

  if (user?.role !== 'admin') {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default UsersRoute;
