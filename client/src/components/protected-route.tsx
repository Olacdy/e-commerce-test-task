import { FC, ReactNode } from 'react';

import { Navigate, redirect } from 'react-router-dom';

import useTokenStore from '@/context/token-context';
import useUserStore from '@/context/user-context';

import { getApiUrl } from '@/lib/utils';

import { UserType } from '@/types/user-type';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const token = useTokenStore((state) => state.token);
  const userStore = useUserStore();

  if (!token && !userStore.user) {
    return <Navigate to='/auth/signup' replace />;
  }

  if (token && !userStore.user) {
    const requestOptions = {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`${getApiUrl()}/users/me`, requestOptions)
      .then((response) => {
        return response.json().then((data) => {
          userStore.setUser(data.status.data.user as UserType);
        });
      })
      .catch(() => {
        redirect('/auth/signup');
      });
  }

  return children;
};

export default ProtectedRoute;
