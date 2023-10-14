import { FC, ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import useTokenStore from '@/context/token-context';

type AuthRouteProps = {
  children: ReactNode;
};

const AuthRoute: FC<AuthRouteProps> = ({ children }) => {
  const token = useTokenStore((state) => state.token);

  if (token) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default AuthRoute;
