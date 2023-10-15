import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import EditUserForm from '@/components/users/edit-user-form';

import useTokenStore from '@/context/token-context';

import { getApiUrl } from '@/lib/utils';

import { UserType } from '@/types/user-type';

const EditUser = () => {
  let { userId } = useParams();

  const token = useTokenStore((store) => store.token);

  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const fetchUser = async (me?: boolean) => {
      const requestOptions = {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(
        `${getApiUrl()}/users/${me ? 'me' : userId}`,
        requestOptions
      );

      const data = await response.json();

      setUser(data);
    };

    fetchUser(!!!userId);
  }, [userId]);

  if (user) {
    return <EditUserForm user={user} updateUser={setUser} me={!!!userId} />;
  }

  return <p>Loading...</p>;
};

export default EditUser;
