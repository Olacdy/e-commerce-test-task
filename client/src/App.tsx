import { Route, Routes } from 'react-router-dom';

import Home from '@/components/home';
import MainLayout from '@/components/main-layout';
import Orders from '@/components/orders/orders';
import ProtectedRoute from '@/components/protected-route';

import AuthLayout from '@/components/auth/auth-layout';
import AuthRoute from '@/components/auth/auth-route';
import SignIn from '@/components/auth/sign-in';
import SignUp from '@/components/auth/sign-up';

import ItemPage from '@/components/items/item-page';
import EditUser from '@/components/users/edit-user';
import Users from '@/components/users/users';

import AdminRoute from '@/components/admin-route';

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
        <Route path='orders' element={<Orders />} />
        <Route element={<AdminRoute />}>
          <Route path='item/:itemId' element={<ItemPage />} />
          <Route path='item' element={<ItemPage />} />
          <Route path='users'>
            <Route index element={<Users />} />
            <Route path=':userId' element={<EditUser />} />
          </Route>
        </Route>
        <Route path='profile' element={<EditUser />} />
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
