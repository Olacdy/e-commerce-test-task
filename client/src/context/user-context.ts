import { create } from 'zustand';

import { getApiUrl } from '@/lib/utils';

import { UserType } from '@/schemas/user-schemas';

type UserStoreType = {
  user: UserType | null;
  setUser: (userData: UserType) => void;
  clearUser: () => void;
  fetchUser: (token: string) => Promise<boolean>;
};

const useUserStore = create<UserStoreType>((set) => ({
  user: null,
  setUser: (userData: UserType) => set({ user: userData }),
  clearUser: () => set({ user: null }),
  fetchUser: async (token: string) => {
    const requestOptions = {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`${getApiUrl()}/users/me`, requestOptions);

    if (response.ok) {
      const data = await response.json();

      set({ user: data as UserType });

      return true;
    }

    return false;
  },
}));

export default useUserStore;
