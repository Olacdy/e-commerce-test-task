import { FC, ReactNode, useEffect } from 'react';

import { Navigate } from 'react-router-dom';

import useTokenStore from '@/context/token-context';
import useUserStore from '@/context/user-context';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const tokenStore = useTokenStore();
  const userStore = useUserStore();

  useEffect(() => {
    const updateUserWithToken = async (token: string) => {
      const result = await userStore.fetchUser(token);

      if (!result) {
        tokenStore.clearToken();
      }
    };

    if (tokenStore.token && !userStore.user) {
      updateUserWithToken(tokenStore.token);
    }
  }, [tokenStore, userStore]);

  if (!tokenStore.token && !userStore.user)
    return <Navigate to='/auth/signup' replace />;

  return children;
};

export default ProtectedRoute;
