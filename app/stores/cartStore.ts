import { CartItem } from "@/types/storeTypes";
import { create } from "zustand";

type CartState = {
  items: CartItem[];
  addItem: (product: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find(
        (i) => i.product.id === item.product.id
      );
      return existingItem
        ? { items: [...state.items] }
        : { items: [...state.items, item] };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== id),
    })),
  increaseQuantity: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    })),
  decreaseQuantity: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.product.id === id && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i
      ),
    })),
}));
