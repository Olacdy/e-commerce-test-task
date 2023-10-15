import { Route, Routes } from 'react-router-dom';

import Home from '@/components/home';
import MainLayout from '@/components/main-layout';
import Orders from '@/components/orders/orders';
import ProtectedRoute from '@/components/protected-route';

import AuthLayout from '@/components/auth/auth-layout';
import AuthRoute from '@/components/auth/auth-route';
import SignIn from '@/components/auth/sign-in';
import SignUp from '@/components/auth/sign-up';

import Users from '@/components/user/users';
import UsersRoute from '@/components/user/users-route';

const App = () => {
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
        <Route
          path='/users'
          element={
            <UsersRoute>
              <Users />
            </UsersRoute>
          }
        />
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
