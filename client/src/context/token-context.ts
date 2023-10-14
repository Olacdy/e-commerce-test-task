import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TokenStoreType = {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
};

const useTokenStore = create<TokenStoreType>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: 'authorization-storage',
    }
  )
);

export default useTokenStore;
