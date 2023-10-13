import { create } from 'zustand';

import { UserType } from '@/types/user-type';

type UserStoreType = {
  user: UserType | null;
  setUser: (userData: UserType) => void;
  clearUser: () => void;
  fetchUser: (token: string) => Promise<void>;
};

const useUserStore = create<UserStoreType>((set) => ({
  user: null,

  setUser: (userData: UserType) => set({ user: userData }),

  clearUser: () => set({ user: null }),

  fetchUser: async (token: string) => {
    try {
      const response = await fetch('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await response.json();
      set({ user: userData });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  },
}));

export default useUserStore;
