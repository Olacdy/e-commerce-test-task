import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import EditUserForm from '@/components/users/edit-user-form';

import useTokenStore from '@/context/token-context';

import { getApiUrl } from '@/lib/utils';

import { UserType } from '@/schemas/user-schemas';

const EditUser = () => {
  const { userId } = useParams();

  const token = useTokenStore((store) => store.token);

  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const fetchUser = async (userId?: string) => {
      const requestOptions = {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(
        `${getApiUrl()}/users/${userId ? userId : 'me'}`,
        requestOptions
      );

      const data = await response.json();

      setUser(data);
    };

    fetchUser(userId);
  }, [token, userId]);

  if (user) {
    return <EditUserForm user={user} updateUser={setUser} me={!userId} />;
  }

  return <p>Loading...</p>;
};

export default EditUser;
