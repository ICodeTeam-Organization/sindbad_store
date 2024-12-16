
import { CartItem } from "@/types/storeTypes";
import { create } from "zustand";

type CartState = {
  items: CartItem[];
  addItem: (product: CartItem) => void;
  removeItem: (id: number) => void; // تغيير id إلى number
  // increaseQuantity: (id: number) => void; // تغيير id إلى number
  // decreaseQuantity: (id: number) => void; // تغيير id إلى number
  updateQuantity: (newQuantity:number,id: number) => void; // تغيير id إلى number
  setCartItems: (products:CartItem[]) => void; // تغيير id إلى number
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (newitem) =>
    set((state) => {
      const existingItem = state.items.find(ele=>ele.cartId == newitem.cartId);
      return existingItem
        ? { items: [...state.items] } // لا تضيف العنصر إذا كان موجودًا
        : { items: [...state.items, newitem] }; // أضف العنصر الجديد
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.cartId !== id), // استخدم cartId هنا
    })),
    updateQuantity: (newQuantity,id)=> {
      return set((state => ({
        items: state.items.map((i) =>
          i.cartId == id ? { ...i, quantity: newQuantity } : i // استخدم cartId هنا
        ),
      })))
    },
  // increaseQuantity: (id) =>
  //   set((state) => ({
      // items: state.items.map((i) =>
      //   i.productId === id ? { ...i, quantity: i.quantity + 1 } : i // استخدم cartId هنا
      // ),
  //   })),
  // decreaseQuantity: (id) =>
  //   set((state) => ({
  //     items: state.items.map((i) =>
  //       i.cartId === id && i.quantity > 1
  //         ? { ...i, quantity: i.quantity - 1 }
  //         : i // استخدم cartId هنا
  //     ),
  //   })),
    setCartItems: (cartItems) =>
      set((state) => {
        return {items:cartItems}
      }),
}));