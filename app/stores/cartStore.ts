 import { create } from "zustand";
import { CartItem } from "@/types/storeTypes";
import {
  BgHandlerDataItemType,
  storeInBgcache,
  SEND_DATA_IN_BG_LOCALSTORAGE_KEY,
} from "@/lib/utils";
// import { savebackgroundDataInCache } from "@/Data/cachingAndBgData/backgroundData";

type CartState = {
  items: CartItem[];
  addItem: (product: CartItem) => void;
  addSpecialItem: (product: CartItem) => void;
  removeItem: (id: number, isSpecialProduct?: boolean) => void;
  updateQuantity: (
    newQuantity: number,
    id: number,
    isSpecialProduct?: boolean
  ) => void;
  setCartItems: (products: CartItem[]) => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (newItem) =>
    set((state) => {
      const exists = state.items.find((i) => i.productId == newItem.productId);
      if (exists) return { items: [...state.items] };

      const newWithQty = { ...newItem, quantity: 1 };

      // ✅ إذا المنتج غير موجود، أضفه بكمية 1 وسجّل ذلك في localStorage
      // عشان ارسال ركوست كل عشر ثواني موجود داخل الcomponents in SendDataInBG
      // savebackgroundDataInCache({
      //   reqType: 3,
      //   reqValue: 1,
      //   Id: newItem.productId,
      //   prevValue: 0, // القيمة السابقة غير معروفة، لذا نستخدم 0
      // })
      storeInBgcache({
        reqType: 3,
        reqValue: 1,
        Id: newItem.productId,
        prevValue: 0, // القيمة السابقة غير معروفة، لذا نستخدم 0
      });

      return { items: [...state.items, newWithQty] };
    }),
  addSpecialItem: (newItem) =>
    set((state) => {
      const exists = state.items.find(
        (i) => i.specialProductId == newItem.specialProductId
      );
      if (exists || !newItem.specialProductId) return { items: [...state.items] };

      const newWithQty = { ...newItem, quantity: 1 };

      // ✅ إذا المنتج غير موجود، أضفه بكمية 1 وسجّل ذلك في localStorage
      // عشان ارسال ركوست كل عشر ثواني موجود داخل الcomponents in SendDataInBG
      storeInBgcache({
        reqType: 4,
        reqValue: 1,
        Id: newItem.specialProductId ,
        prevValue: 0, // القيمة السابقة غير معروفة، لذا نستخدم 0
      });

      return { items: [...state.items, newWithQty] };
    }),

  removeItem: (id, isSpecialProduct) =>
    set((state) => {
      if (isSpecialProduct) {
        const item = state.items.find((i) => i.specialProductId == id);
        if (item) {
          storeInBgcache({
            reqType: 4,
            reqValue: 0,
            Id: id,
            reviewText: null,
            prevValue: item.quantity,
          });
        }
        return {
          items: state.items.filter((i) => i.specialProductId !== id),
        };
      } else {
        const item = state.items.find((i) => i.productId == id);
        if (item) {
          // ✅ عند حذف منتج من السلة، احفظ ذلك في localStorage مع reqValue = 0
          storeInBgcache({
            reqType: 3,
            reqValue: 0,
            Id: id,
            reviewText: null,
            prevValue: item.quantity,
          });
        }

        return {
          items: state.items.filter((i) => i.productId !== id),
        };
      }
    }),

  updateQuantity: (newQuantity, id, isSpecialProduct) =>
    set((state) => {
      const updatedItems = state.items.map((item) => {
        if (isSpecialProduct) {
          if (item.specialProductId == id) {
            const updated = { ...item, quantity: newQuantity };
            storeInBgcache({
              reqType: 4, // 4 يعني منتج خاص في السلة
              reqValue: newQuantity, // نعتبره تعديل/إضافة
              Id: +id,
              prevValue: item.quantity, // القيمة السابقة
            });
            return updated;
          }
        } else {
          if (item.productId == id) {
            const updated = { ...item, quantity: newQuantity };
            storeInBgcache({
              reqType: 3, //  3 يعني منتج عادي في السلة
              reqValue: newQuantity, // نعتبره تعديل/إضافة
              Id: +id,
              prevValue: item.quantity, // القيمة السابقة
            });
            return updated;
          }
        }

        return item;
      });

      return { items: updatedItems };
    }),

  setCartItems: (cartItems) =>
  set(() => {
    const bgHandlerData = localStorage.getItem(SEND_DATA_IN_BG_LOCALSTORAGE_KEY);
    const data: BgHandlerDataItemType[] = bgHandlerData ? JSON.parse(bgHandlerData) : [];

    if (!data) return { items: cartItems };

    // انسخ العناصر الحالية
    const updatedCartItems = [...cartItems];

    data.forEach((item) => {
      const { reqType, Id, reqValue } = item;

      if (reqType === 3) {
        // منتجات عادية
        const existingItem = updatedCartItems.find(ci => ci.productId == Id);
        if (existingItem) {
          // عدل الكمية
          existingItem.quantity = reqValue;
        } else {
          // أضف منتج جديد
          updatedCartItems.push({
            productId: +Id,
            quantity: reqValue, 
          } as any);
        }
      } else if (reqType === 4) {
        // منتجات خاصة
        const existingItem = updatedCartItems.find(ci => ci.specialProductId == Id);
        if (existingItem) {
          existingItem.quantity = reqValue;
        } else {
          updatedCartItems.push({
            specialProductId: Id,
            quantity: reqValue, 
          } as any);
        }
      }
    });

    return { items: updatedCartItems };
  }), 
}));
