import { useEffect, useState } from 'react';

import UsersTable from '@/components/users/users-table';

import useTokenStore from '@/context/token-context';

import { getApiUrl } from '@/lib/utils';

import { UserType } from '@/types/user-type';

const Users = () => {
  const token = useTokenStore((store) => store.token);

  const [users, setUsers] = useState<UserType[]>([]);

  const handlePromote = (userId: string) => {
    console.log('Promote: ', userId);
  };

  const handleEdit = (userId: string) => {
    console.log('Edit: ', userId);
  };

  const handleDelete = (userId: string) => {
    console.log('Delete: ', userId);
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
