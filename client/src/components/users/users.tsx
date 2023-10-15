import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import UsersTable from '@/components/users/users-table';

import useTokenStore from '@/context/token-context';

import { getApiUrl } from '@/lib/utils';

import { UserType } from '@/types/user-type';

const Users = () => {
  const token = useTokenStore((store) => store.token);

  const [users, setUsers] = useState<UserType[]>([]);

  const handlePromote = async (userId: string) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        `${getApiUrl()}/users/promote/${userId}`,
        requestOptions
      );

      if (!response.ok) throw new Error(`${response.status}`);
      const newUser = await response.json();

      setUsers(
        users.map((user) => {
          if (user.id === userId) return newUser;
          return user;
        })
      );
    } catch (error) {
      toast.error('Something went wrong. Try again.');
    }
  };

  const handleEdit = (userId: string) => {
    console.log('Edit: ', userId);
  };

  const handleDelete = async (userId: string) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        `${getApiUrl()}/users/${userId}`,
        requestOptions
      );

      if (!response.ok) throw new Error(`${response.status}`);

      setUsers(
        users.filter((user) => {
          if (user.id !== userId) return user;
        })
      );
    } catch (error) {
      toast.error('Something went wrong. Try again.');
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const requestOptions = {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(`${getApiUrl()}/users`, requestOptions);

      const data = await response.json();

      setUsers(data);
    };

    fetchUsers();
  }, [token]);

  return (
    <UsersTable
      users={users}
      handlePromote={handlePromote}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Users;
