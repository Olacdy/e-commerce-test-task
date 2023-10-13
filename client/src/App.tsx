import { FC } from 'react';

import { Route, Routes } from 'react-router-dom';

import SignIn from '@/components/auth/sign-in';
import SignUp from '@/components/auth/sign-up';
import Home from '@/components/home';
import MainLayout from '@/components/main-layout';
import Orders from '@/components/orders';
import ProtectedRoute from '@/components/protected-route';

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
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
    </Routes>
  );
};

export default App;
