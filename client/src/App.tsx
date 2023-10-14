import { FC } from 'react';

import { Route, Routes } from 'react-router-dom';

import Home from '@/components/home';
import MainLayout from '@/components/main-layout';
import Orders from '@/components/orders';
import ProtectedRoute from '@/components/protected-route';

import AuthLayout from '@/components/auth/auth-layout';
import AuthRoute from '@/components/auth/auth-route';
import SignIn from '@/components/auth/sign-in';
import SignUp from '@/components/auth/sign-up';

type AppProps = {};

const App: FC<AppProps> = ({}) => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
        <Route index element={<Home />} />
        <Route path='/orders' element={<Orders />} />
      </Route>
      <Route
        path='/auth'
        element={
          <AuthRoute>
            <AuthLayout />
          </AuthRoute>
        }>
        <Route path='/auth/signup' element={<SignUp />} />
        <Route path='/auth/signin' element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
