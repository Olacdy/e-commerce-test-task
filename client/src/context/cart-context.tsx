import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CartItemType } from '@/types/cart-type';

type CartStoreType = {
  cart: CartItemType[];
  addToCart: (cartItem: CartItemType) => void;
  isIncrease: (cartItem: CartItemType) => boolean;
  increaseItemAmount: (cartItem: CartItemType) => void;
  total: () => number;
  clearCart: () => void;
};

const useCartStore = create<CartStoreType>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (cartItem: CartItemType) => {
        if (cartItem.amount > 0) {
          if (!get().isIncrease(cartItem))
            set({ cart: [cartItem, ...get().cart] });
          else get().increaseItemAmount(cartItem);
        }
      },
      isIncrease: (cartItem: CartItemType) =>
        get().cart.some((ct) => {
          return ct.item.id === cartItem.item.id;
        }),
      increaseItemAmount: (cartItem: CartItemType) => {
        const oldAmount = get().cart.find(
          (ct) => ct.item.id === cartItem.item.id
        )?.amount!;
        const newCartItems = get().cart.filter(
          (ct) => ct.item.id !== cartItem.item.id
        );

        set({
          cart: [
            { ...cartItem, amount: oldAmount + cartItem.amount },
            ...newCartItems,
          ],
        });
      },
      total: () =>
        Math.round(
          get().cart.reduce((accumulator, ct) => {
            return accumulator + ct.amount * ct.item.price;
          }, 0) * 100
        ) / 100,
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
