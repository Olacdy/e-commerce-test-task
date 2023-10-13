import { FC, ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import useUserStore from '@/context/user-context';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to='/signup' replace />;
  }

  return children;
};

export default ProtectedRoute;
