import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { OrderDescriptionType } from '@/types/order-description-type';

type CartStoreType = {
  cart: OrderDescriptionType[];
  addToCart: (cartItem: OrderDescriptionType) => void;
  isIncrease: (cartItem: OrderDescriptionType) => boolean;
  increaseItemQuantity: (cartItem: OrderDescriptionType) => void;
  total: () => number;
  clearCart: () => void;
};

const useCartStore = create<CartStoreType>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (cartItem: OrderDescriptionType) => {
        if (cartItem.quantity > 0) {
          if (!get().isIncrease(cartItem))
            set({ cart: [cartItem, ...get().cart] });
          else get().increaseItemQuantity(cartItem);
        }
      },
      isIncrease: (cartItem: OrderDescriptionType) =>
        get().cart.some((ct) => {
          return ct.item.id === cartItem.item.id;
        }),
      increaseItemQuantity: (cartItem: OrderDescriptionType) => {
        const oldAmount = get().cart.find(
          (ct) => ct.item.id === cartItem.item.id
        )?.quantity!;
        const newCartItems = get().cart.filter(
          (ct) => ct.item.id !== cartItem.item.id
        );

        set({
          cart: [
            { ...cartItem, quantity: oldAmount + cartItem.quantity },
            ...newCartItems,
          ],
        });
      },
      total: () =>
        Math.round(
          get().cart.reduce((accumulator, ct) => {
            return accumulator + ct.quantity * ct.item.price;
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
